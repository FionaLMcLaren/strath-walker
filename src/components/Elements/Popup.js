import {IconButton, Portal} from "react-native-paper";
import React, {Component, useEffect} from "react";
import {View} from "react-native";
import Text from "./Text"
import classNames from "classnames";

export class Popup extends Component {

    constructor (props) {
        super(props);
        this.state = {
            snackbarVisible: false
        }
    }

    hidePopup () {
        this.setState({snackbarVisible: false})
    }

    showPopup () {
        this.setState({snackbarVisible: true})
    }

    componentDidMount() {
        if (this.state.snackbarVisible) {
            const timeout = setTimeout(() => {
                console.log("timeout!")
                this.hidePopup()
            }, 5000);

            return () => clearTimeout(timeout);
        }
    }

    render () {

        return (this.state.snackbarVisible) ? (
            <Portal>
                <View className="absolute bottom-0 bg-pink-200 border-t-4 w-full mb-3 h-16 " ref={props.innerRef}/>
                <View
                    className="flex flex-row items-center gap-8 absolute bottom-0 bg-white w-full border-t-2 px-6 h-16"
                >
                    <View className="w-3/4">
                        <Text>{this.props.text}</Text>
                    </View>
                    <IconButton
                        icon="close"
                        iconColor={"white"}
                        size={20}
                        onPress={this.hidePopup}
                        className="flex items-center bg-black rounded-full border-2 z-[1000] "
                    />
                </View>
            </Portal>
        ) : null
    }
}
