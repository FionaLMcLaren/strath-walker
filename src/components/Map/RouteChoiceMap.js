import {Text, View, StyleSheet} from "react-native";
import MapView, {Polyline} from "react-native-maps";
import {Marker} from "react-native-maps";


export const RouteChoiceMap = ({polyline}) => {
    const coordinates = polyline ? polyline.getCoordinates() : [];
    return (
        <MapView
            className={styles.map}
            minZoomLevel={10}
            style={StyleSheet.absoluteFillObject, {height:"30%"}}
            initialRegion={{
                latitude: 55.861873,
                longitude: -4.244115,
                latitudeDelta: 0.002,
                longitudeDelta: 0.002,
            }}
        >
            {
                polyline &&
                <Polyline
                    key={polyline.getKey()}
                    coordinates={coordinates}
                    strokeColor="#4285F4"
                    strokeWidth={6}
                />
            }
        </MapView>

    )
}

const styles = {
    map: "items-center justify-center h-4/5 bg-neutral-950",
};

export default RouteChoiceMap;







