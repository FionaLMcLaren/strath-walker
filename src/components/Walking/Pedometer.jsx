// Pedometer.jsx
// A simple component that displays the steps taken by the user while it is in focus
// Step Detection logic based on 'Lecture 1: Pedometer Algorithm Explained' by Navigine on YouTube.
// (https://www.youtube.com/watch?v=cpwrwPTqMac)

import {useCallback, useState} from "react";
import {useFocusEffect} from "@react-navigation/native";
import { Text } from "react-native";

// https://react-native-sensors.github.io/docs/Usage.html
import { accelerometer, setUpdateIntervalForType, SensorTypes } from 'react-native-sensors';
import { scan } from 'rxjs';

// TODO: It's possible that adjusting these alone won't really be enough to get a proper reading.
// TODO: Might need a cooldown period at beginning / in between steps? Reads long periods of acceleration as constant steps. How good is this in practice?
const ACCELEROMETER_UPDATE_INTERVAL = 400;  // Time in ms between each accelerometer reading
const HIGH_PASS_FILTER_ALPHA        = 0.8;  // Controls the smoothing of the gravity high pass filter (low value = takes longer to adjust to changes like rotation)
const STEP_DETECTION_THRESHOLD      = 3.15;  // The acceleration threshold for detecting a step (m/s)
const LOW_PASS_FILTER_ALPHA         = 0.55; // Controls the amount of smoothing applied to the speed (low value = ignores sudden spikes)

setUpdateIntervalForType(SensorTypes.accelerometer, ACCELEROMETER_UPDATE_INTERVAL);

const Pedometer = () => {

    const [steps, setSteps] = useState(-2);

    // Low pass filter to smooth out the accelerometer data
    const [speed, setSpeed] = useState({x: 0, y: 0, z: 0});
    const lpf = (x, y, z) => {
        const newSpeed = {
            x: LOW_PASS_FILTER_ALPHA * x + (1 - LOW_PASS_FILTER_ALPHA) * speed.x,
            y: LOW_PASS_FILTER_ALPHA * y + (1 - LOW_PASS_FILTER_ALPHA) * speed.y,
            z: LOW_PASS_FILTER_ALPHA * z + (1 - LOW_PASS_FILTER_ALPHA) * speed.z
        }
        setSpeed(newSpeed);
        return newSpeed;
    }

    // Subscribe to accelerometer reads & unsubscribe when not in focus
    useFocusEffect(
        useCallback(() => {
            const subscription = accelerometer
                .pipe(scan((acc, curr) => {
                    // High pass filter to separate gravity from actual motion
                    const xg = HIGH_PASS_FILTER_ALPHA * acc.xg + (1 - HIGH_PASS_FILTER_ALPHA) * curr.x;
                    const yg = HIGH_PASS_FILTER_ALPHA * acc.yg + (1 - HIGH_PASS_FILTER_ALPHA) * curr.y;
                    const zg = HIGH_PASS_FILTER_ALPHA * acc.zg + (1 - HIGH_PASS_FILTER_ALPHA) * curr.z;

                    // Subtract gravity from the current acceleration to get the actual motion
                    const x = curr.x - xg;
                    const y = curr.y - yg;
                    const z = curr.z - zg;

                    return {x, y, z, xg, yg, zg};
                }, {x: 0, y: 0, z: 0, xg: 0, yg: 0, zg: 0}))
                .subscribe(observedSpeed => {
                    const lpfSpeed = lpf(observedSpeed.x, observedSpeed.y, observedSpeed.z);
                    // https://physics.stackexchange.com/a/41655
                    const magnitude = Math.sqrt(lpfSpeed.x**2 + lpfSpeed.y**2 + lpfSpeed.z**2);
                    if (magnitude > STEP_DETECTION_THRESHOLD) {
                        setSteps(prevSteps => prevSteps + 1);
                    }
                });
            return () => subscription.unsubscribe(); // Unsubscribe on unmount
        }, [])
    )

    return (
        <Text>Steps: {steps}</Text>
    )

}

export default Pedometer;
