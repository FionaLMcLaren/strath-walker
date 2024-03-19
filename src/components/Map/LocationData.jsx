import {Location} from "../Routes/Location";

// Locations within Strathclyde University that are used as beginning / end points for the routes
export const universityLocations =
    require('../../../data/university_locations.json')
        .map((jsonObject) => {
            return new Location(jsonObject.name, jsonObject.latitude, jsonObject.longitude)
        });

// Points of interest that serve as intermediate locations for the routes
export const pointsOfInterest =
    require('../../../data/points_of_interest.json')
        .map((jsonObject) => {
            return new Location(jsonObject.name, jsonObject.latitude, jsonObject.longitude)
        });
