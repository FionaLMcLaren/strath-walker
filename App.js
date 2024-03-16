import "./global.css"
import Home from './src/screens/Home';
import StartPoint from './src/screens/StartPoint';
import EndPoint from './src/screens/EndPoint';
import Routes from './src/screens/Routes';
import Walk from './src/screens/Walk';
import StartWalk from './src/screens/StartWalk';
import EndWalk from './src/screens/EndWalk';

import NavHead from './src/components/Elements/NavHead';

import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
    const theme = {
        ...DefaultTheme,
        mode: 'light',
    }

    return(
        <PaperProvider theme={theme}>
            <NavigationContainer>
              <Stack.Navigator
                  initialRouteName="Routes"
                  screenOptions={{
                      header: NavHead
                  }}
              >
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="StartPoint" component={StartPoint} />
                <Stack.Screen name="EndPoint" component={EndPoint} />
                <Stack.Screen name="StartWalk" component={StartWalk} />
                <Stack.Screen name="Walk" component={Walk} />
                <Stack.Screen name="EndWalk" component={EndWalk} />
                <Stack.Screen name="Routes" component={Routes} />
              </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>
    )
}
