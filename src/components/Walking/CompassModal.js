import {Dialog, Icon, Portal} from "react-native-paper";
import { View, Image, ImageBackground, Animated} from "react-native";
import CompassHeading from "react-native-compass-heading";
import React, {useState, useRef} from "react";
import Label from "../Elements/Label";
import Text from "../Elements/Text";
import Modal from "../Elements/Modal"
import Button from "../Elements/NextBtn"

export default function CompassModal({destination}){

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

                        <ImageBackground
                            style={{
                                width: 200,
                                height: 200,
                                justifyContent:"center",
                            }}
                            source={require('../../../images/compassCenter.png')}
                        >
                            <View className>
                            </View>
                                <Animated.Image
                                    style={{
                                        width: 200,
                                        height: 200,
                                        transform: [{rotate: `${angle}deg`}],
                                    }}
                                    source={require('../../../images/compass.png')}
                                />



                            </ImageBackground>
                        <DestinationArrow destination = {destination}/>
                    </View>
                </Modal>


        </View>

    );
}

const DestinationArrow = ({destination}) => {
    if(destination){
        return(
            <View className="flex items-center ">
                <Label title={"To Head"} colour="tq"/>
                <Image
                    style={{
                        width: 20,
                        height: 20,
                        transform: [{rotate: `${destination}deg`}],
                    }}
                    source={require('../../../images/arrow.png')}
                />
                <Text>{destination} deg</Text>
            </View>
        );
    }
}
