import StartPoint from './src/screens/StartPoint';
import EndPoint from './src/screens/EndPoint';
import Routes from './src/screens/Routes';
import Walk from './src/screens/Walk';

import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
    return(
        <PaperProvider>
            <NavigationContainer>
              <Stack.Navigator initialRouteName="Starting Point">
                <Stack.Screen name="Starting Point" component={StartPoint} />
                <Stack.Screen name="End Point" component={EndPoint} />
                <Stack.Screen name="Walk" component={Walk} />
                <Stack.Screen name="Routes" component={Routes} />
              </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>
    )
}
