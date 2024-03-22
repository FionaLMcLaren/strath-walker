import React, { useState} from "react";
import { Pressable, View} from "react-native";
import {Portal, Modal, Icon, IconButton} from "react-native-paper";
import Text from "../Elements/Text";

/*
A dialog display for the app.
It takes in...
- A title, which is rendered as the title of the modal
- Children, which is the content of the modal
- modalVisible and setModalVisible - which controls if the modal
is showing on screen or not
- confirmAction, which is the action to be executed when the user
accepts the modal
- dismissAction, which, if it exists, is the action to be executed
when the user closes the modal
 */
export default function appModal(props) {

    return (
        <>
            <Portal>
                <Modal
                    visible={props.modalVisible}
                    onDismiss={() => {
                        if (props.dismissAction) {
                            props.dismissAction
                        } else {
                            props.toggleModalVisible(false)
                        }
                    }}
                >
                    <View className="absolute bg-teal-100 w-full h-full scale-95 translate-y-5 rounded-lg border-2 border-b-4 " />
                    <IconButton
                        icon={"close"}
                        size={25}
                        colour={"black"}
                        className="rounded-full bg-teal-400 border-2 border-b-4 border-r-4 bg-black active:bg-teal-500 transition-all "
                        onPress={() => {
                            if (props.dismissAction) {
                                props.dismissAction()
                            } else {
                                props.toggleModalVisible(false)
                            }
                        }}
                    />
                    <View className="flex items-center m-6 justify-center
                         bg-white
                         border-2 rounded-lg z-10 ">

                        <View className="w-full bg-teal-400 p-2 rounded-t-md border-b-2 items-center">
                            <Text bold={true} title={true}>
                                {props.title}
                            </Text>
                        </View>

                        {props.children}

                        <View className="w-full ">
                            <Pressable
                                onPress={props.confirmAction}
                                className="p-2 rounded-b-md border-y-2 bg-teal-400 px-12 active:bg-teal-500 transition-all ">
                                <Text bold={true} >Confirm</Text>
                                <View className="absolute right-0 flex items-center
                                pr-1 h-8 w-8 rounded-full bg-teal-200 border-2 border-b-4 border-r-4
                                scale-150 -translate-x-6 -translate-y-4 rotate-12 ">
                                    <View className="absolute scale-105 translate-y-0.5 -translate-x-0.5" >
                                        <Icon className="z-10 " source={"check-bold"} color={"black"} size={18}/>
                                    </View>
                                    <Icon className="z-10 " source={"check-bold"} color={"white"} size={18}/>

                                </View>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            </Portal>
        </>

    );

}

