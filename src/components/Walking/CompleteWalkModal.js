import {Dialog, Portal} from "react-native-paper";
import {Button} from "react-native";
import React from "react";

const SuccessModal = () =>{
    const [modalVisible, toggleModalVisible] = React.useState(true);

    setTimeout(()=>{
        toggleModalVisible(false);
        navigation.navigate("EndWalk",
            {
                walkTracker: tracker,
                startingLoc: route.params.startingLoc,
                steps: steps,
            })
    }, 5000);
    return(
        <Portal>
            <Dialog
                visible={modalVisible}
                onDismiss={() => toggleModalVisible(false)}
            >
                Congratulations! - You Completed the Walk!

            </Dialog>
        </Portal>
    );
}
