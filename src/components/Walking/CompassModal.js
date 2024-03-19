import {Dialog, Icon, Portal} from "react-native-paper";
import { View, Image, ImageBackground, Animated} from "react-native";
import CompassHeading from "react-native-compass-heading";
import React, {useState, useRef} from "react";
import Label from "../Elements/Label";
import Text from "../Elements/Text";
import Modal from "../Elements/Modal"
import Button from "../Elements/NextBtn"

export default function CompassModal({destination, heading}){

    const [modalVisible, toggleModalVisible] = React.useState(false);
    const [angle, setAngle] = useState(0);
    const animationDegree = useRef(new Animated.Value(0)).current;

    return (
        <View>
            <Button
                title={"Compass"}
                colour="tq"
                outline={true}
                action={() => {toggleModalVisible(true);
                    const degree_rate = 5;

                    CompassHeading.start(degree_rate, ({heading}) => {
                        setAngle(heading);

                        Animated.timing(animationDegree, {
                            useNativeDriver: false,
                            toValue: heading,
                            duration: 200,
                        }).start();
                    });}}
            />

                <Modal
                    title={"Compass"}
                    modalVisible={modalVisible}
                    toggleModalVisible={toggleModalVisible}
                    confirmAction={() => {toggleModalVisible(false); CompassHeading.stop();}}
                >
                    <View className="py-4 items-center gap-1">
                        <Label title={"Your Direction"} colour="tq"/>
                        <Text>{angle} deg</Text>
                        <View>
                                <Animated.Image
                                    style={{
                                        width: 40,
                                        height: 40,
                                        transform: [{rotate: `${(destination-angle)%360}deg`}],
                                        margin: 75,
                                    }}
                                    className="absolute "
                                    source={require('../../../images/arrow.png')}
                                />

                                        <Animated.Image
                                            style={{
                                                width: 200,
                                                height: 200,
                                                transform: [{rotate: `-${angle}deg`}],

                                            }}

                                            source={require('../../../images/compass.png')}
                                        />
                        </View>

                        <DestinationHeading destination = {destination} heading={heading} />
                    </View>
                </Modal>


        </View>

    );
}

const DestinationHeading=({destination, heading})=>{
    if(destination || destination ===0) {
        return(
            <View className="flex items-center ">
                <Label title={"Destination"} colour="pk"/>
                <Text>{destination} deg {heading}</Text>
            </View>
        )
    }
}
