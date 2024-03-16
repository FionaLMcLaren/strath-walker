import {Text, View, StyleSheet} from "react-native";
import MapView, {Polyline} from "react-native-maps";
import {Marker} from "react-native-maps";


export const RouteChoiceMap = ({polylines}) => {
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
        <RenderPolylines polylines={polylines} />
        <CheckPoints points={polylines}/>

        </MapView>

    )
}



const RenderPolylines=({polylines})=>{
    if(polylines){
        return polylines.getCoordinates().map((coordinates, index)=>{
            if(index%2===0){
                return(<EvenLine coord={coordinates} index={index}/>);
            }else{
                return(<OddLine coord={coordinates} index={index}/>);
            }

        });
    }

}

const OddLine=({coord, index})=>{
    return(
        <Polyline
            index={index}
            coordinates={coord}
            strokeColor="#4285F4"
            strokeWidth={6}
        />

    );
}

const EvenLine=({coord, index})=>{
    return(
        <Polyline
            index={index}
            coordinates={coord}
            strokeColor="#eb4034"
            strokeWidth={6}
        />

    );
}


const CheckPoints=({points})=>{
    if(points){
        return points.getPath().getPath().map((marker)=>{
            return(
                <Marker
                    coordinate={marker.getPos()}
                    key={marker.getName()}
                >
                    <Text>{marker.getName()}</Text>
                </Marker>
            );
        });
    }

}

const styles = {
    map: "items-center justify-center h-4/5 bg-neutral-950",
};

export default RouteChoiceMap;







