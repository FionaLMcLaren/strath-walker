import {View} from "react-native";
import React from "react";
import Modal from "../Elements/Modal";
import Text from "../Elements/Text";


//Modal that appears on completion of a walk
export default function SuccessModal({route, navigation, tracker, steps, modalVisible, toggleModalVisible}){
    //Function that runs to end the walk
    const goToEndWalk = () => {
        tracker.stopWalk();
        toggleModalVisible(false);
        navigation.navigate("EndWalk",
            {
                walkTracker: tracker,
                startingLoc: route.params.startingLoc,
                steps: steps,
            })
    }

    return(
        <Modal
            confirmAction={() =>{goToEndWalk()}}
            dismissAction={() =>{goToEndWalk()}}
            modalVisible={modalVisible}
            toggleModalVisible={toggleModalVisible}
            title={"Finished Walk"}

        >
            <View className="p-4">
                <Text>Congratulations! - You Completed the Walk!</Text>
            </View>
        </Modal>
    );
}
