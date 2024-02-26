import React from "react";
import {Text, View, ScrollView, SafeAreaView} from "react-native";
import {PathGenerator} from '../Routes/GeneratePoints.js';
import {Location} from '../Routes/Location.js';


export default function Routes() {

   	const styles = {
   		container: "flex flex-1 items-center justify-center",
   	};

   	const start = new Location("Rottenrow", 55.861873, -4.244115);
   	const end = new Location("Royal College", 55.8612, -4.2464);
   	const middlePoints = [new Location("George Square", 55.8612, -4.2502), new Location("Glasgow Green", 55.8491, -4.2353), new Location("Buchanan Galleries", 55.8638, -4.2524)];

   	let pathGenerator = new PathGenerator(start, end, middlePoints);
   	let paths = pathGenerator.getPaths();

   	return (
            <View className={styles.container}>
               <Text>Routes page</Text>
               <SafeAreaView>
                    <ScrollView>
                        <RoutesSection paths={paths} start={start} end={end}/>
                    </ScrollView>
               </SafeAreaView>
            </View >
    );

}

const RoutesSection=(props)=>{
    return props.paths.map((path) => {
        return(
                <View>
                    <Text>{props.start.getName()} -> </Text>
                    <RoutesTab path={path}/>
                    <Text>{props.end.getName()}</Text>
                    <Text>-</Text>
                    <Text></Text>
                </View>
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




