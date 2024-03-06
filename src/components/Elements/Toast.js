import {Portal, Snackbar} from "react-native-paper";
import React from "react";

export default function Toast({text, snackbarVisible, toggleSnackbarVisible}) {
    return (
        <Portal>
            <Snackbar
                visible={snackbarVisible}
                onDismiss={() => toggleSnackbarVisible(false)}
                action={{
                    label: 'Close',
                    onPress: () => {
                        toggleSnackbarVisible(false)
                    },
                }
                }>
                {text}
            </Snackbar>
        </Portal>
    )
}