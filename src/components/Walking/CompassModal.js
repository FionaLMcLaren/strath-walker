import {Button, Dialog, Portal} from "react-native-paper";
import {Text, View, Image, ImageBackground, Animated} from "react-native";
import CompassHeading from "react-native-compass-heading";
import React, {useState, useRef} from "react";


export default function CompassModal({destination}){

    const [modalVisible, toggleModalVisible] = React.useState(false);
    const [angle, setAngle] = useState(0);
    const animationDegree = useRef(new Animated.Value(0)).current;


    return (
        <View>
            <Button
                onPress={() => {toggleModalVisible(true);
                    const degree_rate = 45;

                    CompassHeading.start(degree_rate, ({heading}) => {
                        setAngle(heading);

                        Animated.timing(animationDegree, {
                            useNativeDriver: false,
                            toValue: heading,
                            duration: 200,
                        }).start();
                    });}}
            >Compass</Button>

            <Portal>
                <Dialog
                    visible={modalVisible}
                    onDismiss={() => {toggleModalVisible(false); CompassHeading.stop();}}
                >
                    <Dialog.Title>
                        Compass
                    </Dialog.Title>

                    <ImageBackground
                        style={{
                            width: 200,
                            height: 200,
                            justifyContent:"center",
                        }}
                        source={require('../../../images/compass.jpg')}
                    >
                        <Animated.Image
                            style={{
                                width: 100,
                                height: 100,
                                borderColor: 'red',
                                borderWidth: 5,
                                transform: [{rotate: `${angle}deg`}],
                            }}
                            source={require('../../../images/arrow.png')}
                        />

                        <DestinationArrow destination = {destination}/>

                    </ImageBackground>



                    <Text>Compass {angle} deg</Text>

                </Dialog>
            </Portal>

        </View>

    );
}

const DestinationArrow = ({destination}) => {
    if(destination){
        return(
        <Image
            style={{
                width: 100,
                height: 100,
                borderColor: 'green',
                borderWidth: 5,
                transform: [{rotate: `${destination}deg`}],
            }}
            source={require('../../../images/arrow.png')}
        />
        );
    }
}
