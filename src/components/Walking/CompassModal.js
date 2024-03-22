import { View, Animated} from "react-native";
import CompassHeading from "react-native-compass-heading";
import React, {useState, useRef} from "react";
import Label from "../Elements/Label";
import Text from "../Elements/Text";
import Modal from "../Elements/Modal";
import Button from "../Elements/NextBtn";


//Modal that appears showing the compass
export default function CompassModal({destination, heading}){

    const [modalVisible, toggleModalVisible] = React.useState(false);
    const [angle, setAngle] = useState(0);
    const animationDegree = useRef(new Animated.Value(0)).current; //used to change direction of compass

    return (
        <View>
            <Button
                title={"Compass"}
                colour="tq"
                outline={true}
                action={() => {toggleModalVisible(true);
                    const degree_rate = 5; //change the degree every 5 degrees moved on users' device

                    CompassHeading.start(degree_rate, ({heading}) => {
                        setAngle(heading);

                        Animated.timing(animationDegree, { //animate the compass movement
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
                                <Animated.Image  //Image of arrow showing the user where to go
                                    style={{
                                        width: 40,
                                        height: 40,
                                        transform: [{rotate: `${(destination-angle)}deg`}],
                                        margin: 75,
                                    }}
                                    className="absolute "
                                    source={require('../../../images/arrow.png')}
                                />

                                <Animated.Image //Image of compass that rotates based on angle
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


//Tab that shows the angle of the destination
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
