import {GOOGLE_CLOUD_API_KEY} from '@env';
import {decode} from "@googlemaps/polyline-codec";

export const getPolyline = async (startLocation, intermediateLocations, endLocation) => {
    try {
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
        return {
            key: startLocation.getName() + " to " + endLocation.getName(),
            coordinates: decode(data.routes[0].polyline.encodedPolyline),
            distance: data.routes[0].distanceMeters, // in meters  (ie 1234)
            duration: data.routes[0].duration,       // in seconds (ie "1234s")
        };
    } catch (error) {
        console.error('Error:', error);
    }
};
