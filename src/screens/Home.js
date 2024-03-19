import React, {useEffect, useState} from "react";
import {PermissionsAndroid, View} from "react-native";
import HomeBtn from "../components/Elements/HomeBtn";
import Text from "../components/Elements/Text";
import {MakeChannels} from "../components/Elements/Notification";
import Modal from "../components/Elements/Modal";

async function getPermission(){
    const allowed = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    return (allowed === PermissionsAndroid.RESULTS.GRANTED);
}

export default function Home({ navigation }) {

    const [permission, setPermission] = useState(false);
    const [modalVisible, toggleModalVisible] = useState(false);

    useEffect(() => {
        MakeChannels().then();  //Makes the notification channel
        getPermission().then(r=> setPermission(r));
    }, []);

    return (
        <View className="flex-1 items-center justify-center gap-2">
            <Text title={true} bold={true} >Welcome!</Text>

            <HomeBtn
                action={() => {
                    if (permission) {
                        navigation.navigate("StartPoint");
                    } else {
                        toggleModalVisible(true);
                    }
                }}
                title={"Start new walk"}
                colour={"tq"}
                icon={"walk"}
            />

            <HomeBtn
                action={() => {
                    if (permission) {
                        navigation.navigate("WalkDataView");
                    } else {
                        toggleModalVisible(true);
                    }
                }}
                title={"See past walks"}
                colour={"pk"}
                icon={"navigation-variant"}
            />

            <HomeBtn
                action={() => {
                    if (permission) {
                        navigation.navigate("SavedRoute");
                    } else {
                        toggleModalVisible(true);
                    }
                }}
                title={"See saved routes"}
                colour={"yl"}
                icon={"book-marker"}
            />

            <Modal
                confirmAction={() =>{
                    getPermission().then(r=> setPermission(r));
                    toggleModalVisible(false);
                }}

                modalVisible={modalVisible}
                toggleModalVisible={toggleModalVisible}
                title={"Can't get location"}
            >
                <View className="p-4 ">
                    <Text>This app requires your location. It cannot work without it.</Text>
                </View>
            </Modal>


        </View>
    )
}
