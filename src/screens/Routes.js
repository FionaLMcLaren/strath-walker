import React, {useState} from "react";
import {Text, View, ScrollView, SafeAreaView, TouchableHighlight} from "react-native";
import {PathGenerator} from '../components/Routes/GeneratePoints.js';
import {Location} from '../components/Routes/Location.js';
import RoutesMap from '../components/Map/RoutesMap.js';

export default function Routes({route}) {

   	const styles = {
   		container: "flex flex-1 justify-center",
   	};

   	const startTime = route.params.startingTime;
    const start = route.params.startingLoc;
    const endTime = route.params.startingTime;
    const end = route.params.startingLoc;

   	//const start = new Location("Rottenrow", 55.861873, -4.244115);
   	//const end = new Location("Royal College", 55.8612, -4.2464);
   	const middlePoints = [new Location("George Square", 55.8612, -4.2502), new Location("Glasgow Green", 55.8491, -4.2353), new Location("Buchanan Galleries", 55.8638, -4.2524)];

   	let pathGenerator = new PathGenerator(start, end, middlePoints);
   	let paths = pathGenerator.getPaths();
   	const [points, setPoints] = useState([start]);

    //TODO Add routing api code here(ish) which takes in paths and start and end
   	return (
            <View className={styles.container}>
               <Text>Routes page</Text>
               <RoutesMap points={points}/>

               <ScrollView>
                    <RoutesSection changePoints={setPoints} paths={paths} start={start} end={end}/>
               </ScrollView>
            </View>
    );

}

const RoutesSection=(props)=>{
    return props.paths.map((path) => {
        return(
                <TouchableHighlight onPress={e => props.changePoints(path)}>
                    <View>
                        <Text>{props.start.getName()} -> </Text>
                        <RoutesTab path={path}/>
                        <Text>{props.end.getName()}</Text>
                        <Text>-</Text>
                        <Text></Text>
                    </View>
                </TouchableHighlight>
        )


    })
}

//<RoutesTab path={path}/>


const RoutesTab=(props)=>{
    return props.path.map((point) => {
        return(
            <Text>{point.getName()} -></Text>
        )

    })

}






