import AsyncStorage from '@react-native-async-storage/async-storage';
import {Location} from "./Location";
import {Path} from "./Path";
import {getPolyline} from "./PolylineRequest";

const MAX_SAVES = 5;


const pathExistsInArray = (path, array) => {
    for (const existingPath of array) {
        if (existingPath.getNamePath().toString() === path.getNamePath().toString()) return true;
    }
    return false;
}

// Checks if the Path of a route (ie Polyline object) is already saved to the device's storage
export const isSavedRoute = async (route) => {
    const path = route.getPath();
    return isSavedPath(path);
}

// Checks if a Path is already saved to the device's storage
export const isSavedPath = async (path) => {
    const savedPaths = await loadPaths();
    return pathExistsInArray(path, savedPaths);
}

// Saves the Path of a route (ie Polyline object) to the device's storage
export const saveRoute = async (route) => {
    const path = route.getPath();
    return await savePath(path);
}

// Saves a Path to the device's storage
export const savePath = async (path) => {
    try {
        const savedPaths = await loadPaths();

        // Don't save the path if it already exists
        if (pathExistsInArray(path, savedPaths)) return true;

        // Add the new path to the front of the list & trim if it's too long
        savedPaths.unshift(path);
        if (savedPaths.length > MAX_SAVES) savedPaths.pop();

        // Save the paths as arrays of locations
        const pathArrays = savedPaths.map(path => path.getPath());
        await AsyncStorage.setItem('savedPaths', JSON.stringify(pathArrays));
    } catch (e) {
        console.error(e);
        return false;
    }
    return true;
}

// Loads the Paths from the device's storage
export const loadPaths = async () => {
    //await AsyncStorage.removeItem('savedPaths')
    const pathJSON = await AsyncStorage.getItem('savedPaths');

    if (pathJSON === null) return [];
    const savedPathArraysObject = JSON.parse(pathJSON);
    return savedPathArraysObject.map(pathArray => new Path(pathArray.map(location => new Location(location.name, location.latitude, location.longitude))));
}

// Loads the Paths from the device's storage and requests the Polylines for them
export const loadRoutes = async () => {
    const paths = await loadPaths();
    return await Promise.all(paths.map(path => getPolyline(path)));
}

