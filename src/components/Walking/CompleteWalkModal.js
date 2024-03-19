import {Dialog, Portal} from "react-native-paper";
import {Button} from "react-native";
import React from "react";
import Modal from "../Elements/Modal"

export default function SuccessModal({route, navigation, tracker, steps, modalVisible, toggleModalVisible}){

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
                Congratulations! - You Completed the Walk!
        </Modal>
    );
}
