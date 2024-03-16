import React, { useState} from "react";
import { Pressable, View} from "react-native";
import {Portal, Modal, Icon, IconButton} from "react-native-paper";
import Text from "../Elements/Text";

export default function TwoBtnModal(props) {

    return (
        <>
            <Portal>
                <Modal
                    visible={props.modalVisible}
                    onDismiss={() => props.toggleModalVisible(false)}
                >

                    <View className="absolute bg-teal-100 w-full h-[22rem] scale-95 translate-y-5 rounded-lg border-2 border-b-4 " />
                    <IconButton
                        icon={"close"}
                        size={25}
                        colour={"black"}
                        className="rounded-full bg-teal-400 border-2 border-b-4 border-r-4 bg-black "
                        onPress={() => props.toggleModalVisible(false)}
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

                        <View className="w-full flex flex-row ">
                            <Pressable
                                onPress={props.actionTwo}
                                className="p-2  border-y-2 border-r-2 bg-gray-400 w-1/2 items-center active:bg-gray-500 transition-all">
                                <Text bold={true} >{props.actionTwoText}</Text>
                            </Pressable>

                            <Pressable
                                onPress={props.actionOne}
                                className="p-2 border-y-2  bg-teal-400 w-1/2 items-center active:bg-teal-500 transition-all">
                                <Text bold={true} >{props.actionOneText}</Text>
                            </Pressable>


                        </View>
                    </View>
                </Modal>
            </Portal>
        </>

    );

}

