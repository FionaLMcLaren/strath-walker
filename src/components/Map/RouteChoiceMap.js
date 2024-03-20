import {Text, View, StyleSheet} from "react-native";
import MapView, {Polyline} from "react-native-maps";
import {Marker} from "react-native-maps";


export const RouteChoiceMap = ({polyline}) => {
    const coordinates = polyline ? polyline.getCoordinates() : [];

    const mapStyle = [
        {
            "featureType": "administrative",
            "elementType": "geometry",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "transit",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        }
    ]

    return (
        <View className="h-full ">
            <MapView
                className={styles.map}
                minZoomLevel={10}
                style={StyleSheet.absoluteFillObject, {height:"80%"}}
                customMapStyle={mapStyle}
                initialRegion={{
                    latitude: 55.851873,
                    longitude: -4.244155,
                    latitudeDelta: 0.025,
                    longitudeDelta: 0.025,
                }}
            >
                {
                    polyline &&
                    <Polyline
                        key={polyline.getKey()}
                        coordinates={coordinates}
                        strokeColor="#2dd4bf"
                        strokeWidth={6}
                        tracksViewChanges={false}
                    />
                }
            </MapView>
        </View>

    )
}

const styles = {
    map: "items-center justify-center ",
};

export default RouteChoiceMap;







