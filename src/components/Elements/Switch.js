import React from "react";
import {Pressable, Switch, View} from "react-native";
import Popup from "./Popup";
import classNames from 'classnames';
import Text from "./Text";

/*
A switch component that can be turned off and on and have actions corresponding to
both actions. It takes...
- switchValue, which is the value of the switch, being either true or false
- switchSetter, which is used to change the value of the switch when needed
- switchText, which is the text detailing the switch's purpose
- switchAction, which is the function that happens when the switch is turned on
- switchOffAction, which is the function that happens when the switch is turned off
- switchVerifier, which runs to check that a switch can be turned on
- verifyFailMsg, which shows a popup message when a switch cannot be turned on
 */
export default function SwitchBtn({ switchValue, switchSetter, switchText, switchAction, switchOffAction, switchVerifier, verifyFailMsg  }) {

    const [popupVisible, togglePopupVisible] = React.useState(false);

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
            togglePopupVisible(true)
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
                        switchValue && "bg-teal-400",
                        !switchValue && "bg-gray-400"
                    )}
                >
                    <Switch
                        thumbColor={"white"}
                        trackColor={{true: "#2dd4bf", false: "#a1a1aa"}}
                        value={switchValue}
                        onValueChange={toggleSwitch}

                    />
                </Pressable>
            </View>

            <Popup snackbarVisible={popupVisible}
                   toggleSnackbarVisible={togglePopupVisible}
                   text={verifyFailMsg}
            />
        </>
    );

}

