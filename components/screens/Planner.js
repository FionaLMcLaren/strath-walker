import React from 'react';
import { Text, View, StyleSheet, StatusBar } from 'react-native';

export default function Home() {

   	const styles = {
   		container: 'flex flex-1 items-center justify-center bg-neutral-300',
   	};

   	return (
            <View className={styles.container}>
               <Text>Open up App.tsx to start working on your app!</Text>
               <StatusBar style="auto" />
            </View >
    );

}

