import React from "react";
import { Text} from "react-native";
import {Button, Dialog, Portal} from "react-native-paper";

export default function ErrorModal({errorTitle, errorText, modalVisible, toggleModalVisible}) {

    const styles = {
        container: "flex items-center justify-center",
    };

    return (
        <Portal>
            <Dialog
                visible={modalVisible}
                onDismiss={() => toggleModalVisible(false)}
            >
                <Dialog.Title>
                    {errorTitle}
                </Dialog.Title>

                <Dialog.Content>
                    <Text>
                       {errorText}
                    </Text>
                </Dialog.Content>

                <Dialog.Actions>
                    <Button
                        onPress={() => {
                            toggleModalVisible(false)
                        }}>
                        Close
                    </Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>

    );

}

