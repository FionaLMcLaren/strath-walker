import React, { useState} from "react";
import { Pressable, Text, View} from "react-native";
import {Portal, Modal} from "react-native-paper";

export default function appModal(props) {

    return (
        <>
            <Portal>
                <Modal
                    visible={props.modalVisible}
                    onDismiss={() => props.toggleModalVisible(false)}
                >
                    <View className="flex items-center bg-white m-6 p-4 justify-center">
                        <Text>
                            {props.title}
                        </Text>

                        {props.children}

                        <View>
                            <Pressable
                                onPress={props.confirmAction}>
                                <Text>Confirm</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            </Portal>
        </>

    );

}

