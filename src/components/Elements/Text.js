import {Text} from "react-native";
import React from "react";
import classNames from 'classnames';

export default function Txt(props) {

    const getTextStyle = () => {
        if (props.bold) {
            return {fontFamily:"MPLUSRounded1c-ExtraBold"}
        } else if (props.black) {
            return {fontFamily:"MPLUSRounded1c-Black"}
        } else {
            return {fontFamily:"MPLUSRounded1c-Medium"}
        }
    }

    return (
        <Text
            style={getTextStyle()}
            className={classNames(
                "z-10",
                !props.colour && "text-black",
                props.accent && "text-l",
                !props.accent && !props.title && "text-xl",
                props.title && "tracking-wide text-2xl",
                props.xlTitle && "tracking-wide text-4xl",
                props.colour && "text-pink-400 text-center tracking-widest "
            )}
        >
                {props.children}
        </Text>
        )
}