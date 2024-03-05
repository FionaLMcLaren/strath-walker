import {GOOGLE_CLOUD_API_KEY} from '@env';
import {decode} from "@googlemaps/polyline-codec";

export class Polyline {
    constructor(key, coordinates, path, distance, duration) {
        this.key = key;
        // decode is supposed to give LatLng tuple to match what the rendering would want,
        // but it doesn't like it! remap coordinates to this format instead
        this.coordinates = coordinates.map(coord => ({latitude: coord[0], longitude: coord[1]}));
        this.path = path;
        this.distance = distance; // in meters
        this.duration = parseInt(duration.slice(0, -1)); // in seconds
    }

    getKey() {
        return this.key;
    }

    getCoordinates() {
        return this.coordinates;
    }

    getPath() {
        return this.path;
    }

    getDistance() {
        return this.distance;
    }

    getDuration() {
        return this.duration;
    }



}

export const getPolyline = async (path) => {
    const startLocation = path.getFirst();
    const intermediateLocations = path.getIntermediates();
    const endLocation = path.getLast();

    try {
        console.log("Fetching route from " + path.getNamePath().join(" -> ") + "...");
        const response = await fetch('https://routes.googleapis.com/directions/v2:computeRoutes', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-Goog-Api-Key': GOOGLE_CLOUD_API_KEY,
                'X-Goog-FieldMask': 'routes.duration,routes.distanceMeters,routes.polyline',
            },
            body: JSON.stringify({
                origin: {
                    location: {
                        latLng: {
                            latitude: startLocation.getLatitude(),
                            longitude: startLocation.getLongitude(),
                        },
                    },
                },
                intermediates: intermediateLocations.map(intermediate => ({
                    location: {
                        latLng: {
                            latitude: intermediate.getLatitude(),
                            longitude: intermediate.getLongitude(),
                        },
                    },
                })),
                destination: {
                    location: {
                        latLng: {
                            latitude: endLocation.getLatitude(),
                            longitude: endLocation.getLongitude(),
                        },
                    },
                },
                travelMode: 'WALK',
                computeAlternativeRoutes: false,
                routeModifiers: {
                    avoidIndoor: true,
                },
                languageCode: 'en-UK',
                units: 'metric',
            }),
        });
        let data = await response.json();
        console.log("Finished fetching route from " + path.getNamePath().join(" -> ") + "!");
        return new Polyline(
            path.getNamePath().join(" -> "),
            decode(data.routes[0].polyline.encodedPolyline),
            path,
            data.routes[0].distanceMeters,
            data.routes[0].duration
        );
    } catch (error) {
        console.error('Error:', error);
    }
};

export const getSuitablePolylines = async(sortedPaths, startTime, endTime) => {
    const UPPER_LEEWAY = 120; // 2 minutes of leeway for the maximum duration
    const LOWER_LEEWAY = 600; // 10 minutes of leeway for the minimum duration
    const freeTimeinSeconds = (endTime.getTime() - startTime.getTime()) / 1000;
    const freeTimeUpperBound = freeTimeinSeconds + UPPER_LEEWAY;
    const freeTimeLowerBound = freeTimeinSeconds - LOWER_LEEWAY;
    if (freeTimeinSeconds <= 0) return [];
    let minDurationIndex = 0;
    let maxDurationIndex = sortedPaths.length - 1;
    let currentIndex = Math.floor(sortedPaths.length / 2);

    let polylineDictionary = {};

    console.log("Fetching suitable polylines...");
    console.log("Free time: " + freeTimeinSeconds + " seconds");
    console.log("Possible paths: " + sortedPaths.length);
    const debugTime = new Date().getTime();

    while (!(minDurationIndex in polylineDictionary) || !(maxDurationIndex in polylineDictionary)) {
        let polyline = await getPolyline(sortedPaths[currentIndex]);
        polylineDictionary[currentIndex] = polyline;
        const TOO_LONG = polyline.getDuration() > freeTimeUpperBound;
        const TOO_SHORT = polyline.getDuration() < freeTimeLowerBound;
        if (TOO_LONG) {
            maxDurationIndex = currentIndex - 1;
            currentIndex = Math.floor((currentIndex + minDurationIndex) / 2);
        } else if (TOO_SHORT) {
            minDurationIndex = currentIndex + 1;
            currentIndex = Math.floor((currentIndex + maxDurationIndex) / 2);
        } else {
            let lowerSearchIndex = currentIndex;
            while (lowerSearchIndex > minDurationIndex) {
                lowerSearchIndex--;
                let lowerSearchPolyline = await getPolyline(sortedPaths[lowerSearchIndex]);
                polylineDictionary[lowerSearchIndex] = lowerSearchPolyline;
                if (lowerSearchPolyline.getDuration() < freeTimeLowerBound) minDurationIndex = lowerSearchIndex + 1;
            }
            let upperSearchIndex = currentIndex;
            while (upperSearchIndex < maxDurationIndex) {
                upperSearchIndex++;
                let upperSearchPolyline = await getPolyline(sortedPaths[upperSearchIndex]);
                polylineDictionary[upperSearchIndex] = upperSearchPolyline;
                if (upperSearchPolyline.getDuration() > freeTimeUpperBound) maxDurationIndex = upperSearchIndex - 1;
            }
        }
    }

    let suitablePolylines = [];
    for (let i = minDurationIndex; i <= maxDurationIndex; i++) {
        suitablePolylines.push(polylineDictionary[i]);
    }

    console.log("Finished fetching suitable polylines!");
    console.log("Suitable polylines: " + suitablePolylines.length);
    console.log("Time taken: " + (new Date().getTime() - debugTime) + "ms");

    return suitablePolylines;
}
