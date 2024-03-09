import React, { useState} from "react";
import {View, Pressable, Switch} from "react-native";
import {Button, Text} from "react-native-paper";
import Toast from "./Toast";
import classNames from 'classnames';

export default function SwitchBtn({ switchDefault, switchText, switchAction, switchOffAction, switchVerifier, verifyFailMsg  }) {

    const [switchValue, switchSetter] = React.useState(switchDefault);
    const [toastVisible, toggleToastVisible] = React.useState(false);

    const styles = {
        container: "flex items-center justify-center",
        switchCon: "flex flex-row items-center justify-center gap-2 p-1",
    };

    const toggleSwitch = () => {
        if (switchVerifier != false) {
            switchSetter(!switchValue)
            if (!switchValue && switchAction) {
                switchAction()
            } else if (switchOffAction) {
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
                <Pressable
                    onPress={toggleSwitch}
                    className={classNames(
                        "rounded-full border-2 border-b-4 border-b-4 m-0.5",
                        switchDefault && "bg-teal-400",
                        !switchDefault && "bg-gray-400"
                    )}
                >
                    <Switch
                        thumbColor={"white"}
                        trackColor={{true: "#2dd4bf", false: "#a1a1aa"}}
                        value={switchDefault}
                        onValueChange={toggleSwitch}

                    />
                </Pressable>
            </View>

            <Toast
                text={verifyFailMsg}
                snackbarVisible={toastVisible}
                toggleSnackbarVisible={toggleToastVisible}
            />
        </>
    );

}

