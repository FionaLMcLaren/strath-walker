import {GOOGLE_CLOUD_API_KEY} from '@env';
import {decode} from "@googlemaps/polyline-codec";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {useState} from "react";

export class Polyline {
    constructor(key, polylines, path, distance, duration) {
        this.key = key;
        // decode is supposed to give LatLng tuple to match what the rendering would want,
        // but it doesn't like it! remap coordinates to this format instead
        this.coordinates = polylines.map(coordinates => coordinates.map(coord => ({latitude: coord[0], longitude: coord[1]})));
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

    getLeg(){
        return this.coordinates[0];
    }

    changeLeg(){
        this.coordinates.shift();
    }

    getDistance() {
        return this.distance;
    }

    getDuration() {
        return this.duration;
    }

    getReadableDuration() {
        let time = this.duration;
        let minsVal = Math.floor(time / 60);
        let secsVal;
        if (minsVal > 1) {
            secsVal = time - (minsVal * 60);
        } else {
            minsVal = 0;
            secsVal=time;
        }


        let mins = minsVal.toString();
        let secs = secsVal.toString();

        return (mins + " min " + secs + " sec");
    }

    setCoords(c){
        this.coordinates = c;
    }



}

export const getPolyline = async (path) => {
    const startLocation = path.getFirst();
    const intermediateLocations = path.getIntermediates();
    const endLocation = path.getLast();

    try {
        console.log("Fetching route " + path.getReadableName() + "...");
        const response = await fetch('https://routes.googleapis.com/directions/v2:computeRoutes', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-Goog-Api-Key': GOOGLE_CLOUD_API_KEY,
                'X-Goog-FieldMask': 'routes.duration,routes.distanceMeters,routes.legs.polyline',
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
                destination: {
                    location: {
                        latLng: {
                            latitude: endLocation.getLatitude(),
                            longitude: endLocation.getLongitude(),
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
                travelMode: 'WALK',
                computeAlternativeRoutes: false,
                routeModifiers: {
                    avoidIndoor: true,
                },
                languageCode: 'en-UK',
                units: 'METRIC',
            }),
        })
        const data = await response.json();
        if (Object.keys(data).length === 0) return undefined; // routing impossible: ie from america to uk

        const route = data.routes[0];
        const legs = route.legs;
        const polylines = legs.map(leg=> decode(leg.polyline.encodedPolyline));
        const distance = route.distanceMeters;

        let pace = await AsyncStorage.getItem('AveragePace');
        let duration;
        if(pace !== null && pace !== "0"){
            pace = JSON.parse(pace).toFixed(2);  //uses average pace to calculate time it would take for user
            //google takes average pace to be around 1.33m/s so we use this number as well as the time taken to get the distance if slopes were not taken into account
            let equivalentDist = 1.33*route.duration;
            duration = equivalentDist/pace;
        }else{
            duration = route.duration;
        }


        console.log("Finished fetching route from " + path.getReadableName() + "!");

        return new Polyline(
            path.getNamePath().join(" -> "),
            polylines,
            path,
            distance,
            duration
        );
    } catch (error) {
        console.error('Error:', error);
    }
};

export const getSuitablePolylines = async (sortedPaths, startTime, endTime) => {
    const UPPER_LEEWAY = 120; // 2 minutes of leeway for the maximum duration
    const LOWER_LEEWAY = 1000; // 10 minutes of leeway for the minimum duration
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

    while ( (!(minDurationIndex in polylineDictionary) || !(maxDurationIndex in polylineDictionary)) && minDurationIndex <= maxDurationIndex) {
        const polyline = await getPolyline(sortedPaths[currentIndex]);
        if (polyline === undefined) {
            console.log("This route is impossible! Assuming the rest are the same...");
            minDurationIndex = 0; maxDurationIndex = -1;
            break;
        }
        polylineDictionary[currentIndex] = polyline;
        const TOO_LONG = polyline.getDuration() > freeTimeUpperBound;
        const TOO_SHORT = polyline.getDuration() < freeTimeLowerBound;
        if (TOO_LONG) {
            maxDurationIndex = currentIndex - 1;
            currentIndex = Math.ceil((currentIndex + minDurationIndex) / 2);
            if (currentIndex in polylineDictionary) currentIndex--; // final check to avoid infinite loop
        } else if (TOO_SHORT) {
            minDurationIndex = currentIndex + 1;
            currentIndex = Math.floor((currentIndex + maxDurationIndex) / 2);
            if (currentIndex in polylineDictionary) currentIndex++; // final check to avoid infinite loop
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

// code for reading in average pace, move/use as needed
export const getAvgPace = async () => {
    try {
        const pace = await AsyncStorage.getItem('AveragePace');
        if(pace === null){
            return null;
        }
        else{
            return JSON.parse(pace);
        }
    } catch (error) {
        console.log(error);
    }
}
