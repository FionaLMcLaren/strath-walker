import {GOOGLE_CLOUD_API_KEY} from '@env';
import {decode} from "@googlemaps/polyline-codec";

export class Polyline {
    constructor(key, coordinates, path, distance, duration) {
        this.key = key;
        // decode is supposed to give LatLng tuple to match what the rendering would want,
        // but it doesn't like it! remap coordinates to this format instead
        this.coordinates = coordinates.map(coord => ({latitude: coord[0], longitude: coord[1]}));
        this.path = path;
        this.distance = distance; // in meters  (ie 1234)
        this.duration = duration; // in seconds (ie "1234s")
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
        console.log("Fetching route from " + startLocation.getName() + " to " + endLocation.getName() + "...");
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
        console.log("Finished fetching route from " + startLocation.getName() + " to " + endLocation.getName() + "!");
        return new Polyline(
            startLocation.getName() + " to " + endLocation.getName(),
            decode(data.routes[0].polyline.encodedPolyline),
            path,
            data.routes[0].distanceMeters,
            data.routes[0].duration
        );
    } catch (error) {
        console.error('Error:', error);
    }
};
