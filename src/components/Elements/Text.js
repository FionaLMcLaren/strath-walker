import {Text} from "react-native";
import React from "react";
import classNames from 'classnames';

/*
Renders a piece of text to display on screen with our app's
font family. It takes...
- bold, which represents if the font is to appear bold
- black, which represents if the font is to appear black
(the heaviest font weight)
- accent, which makes the text smaller than normal text
- colour, which colours the text to pink.
- title, which makes the text bigger than normal text
- xlTitle, which makes the text bigger than title text and normal text
- children, which is the text content
- action, which is what happens if the text is pressed - for making text buttons
like the reroute button
 */
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
                props.colour && "text-pink-400 text-center tracking-widest ",
                props.action && "active:scale-95 transition-all "
            )}
            onPress={props.action}
        >
                {props.children}
        </Text>
        )
}