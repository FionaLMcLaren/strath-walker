import React from "react";
import {Text, View, Button} from "react-native";

export default function Routes() {

   	const styles = {
   		container: "flex flex-1 items-center justify-center",
   	};

   	return (
            <View className={styles.container}>
               <Text>Open up App.tsx to start working on your app!</Text>

                <Button
                    title="Go to Details"
                    onPress={() => {
                        navigation.navigate('Details', {
                            itemId: 86,
                            otherParam: 'anything you want here',
                        });
                    }}
                />
            </View >
    );

}

