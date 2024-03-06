import React, { useState} from "react";
import {View} from "react-native";
import {Button, Switch, Text} from "react-native-paper";
import Toast from "./Toast";

export default function SwitchBtn({ switchDefault, switchText, switchAction, switchOffAction, switchVerifier, verifyFailMsg  }) {

    const [switchValue, switchSetter] = React.useState(switchDefault);
    const [toastVisible, toggleToastVisible] = React.useState(false);

    const styles = {
        container: "flex items-center justify-center",
        switchCon: "flex flex-row items-center justify-center gap-3",
    };

    const toggleSwitch = () => {
        if (switchVerifier != false) {
            switchSetter(!switchValue)
            if (!switchValue) {
                switchAction()
            } else {
                switchOffAction()
            }
        }
        else {
            //if does not pass the verifier, show the snackbar with the verification error
            toggleToastVisible(true)
        }
    }

    return (
        <>
            <View className={styles.switchCon}>
                <Text>{switchText}</Text>
                <Button
                    onPress={toggleSwitch}
                >
                    <Switch
                        value={switchValue}
                        onValueChange={toggleSwitch}/>
                </Button>
            </View>

            <Toast
                text={verifyFailMsg}
                snackbarVisible={toastVisible}
                toggleSnackbarVisible={toggleToastVisible}
            />
        </>
    );

}

