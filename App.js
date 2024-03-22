import "./global.css"
import Home from './src/screens/Home';
import StartPoint from './src/screens/SelectPoint/StartPoint';
import EndPoint from './src/screens/SelectPoint/EndPoint';
import Routes from './src/screens/Route/Routes';
import Walk from './src/screens/Walk/Walk';
import StartWalk from './src/screens/Walk/StartWalk';
import EndWalk from './src/screens/Walk/EndWalk';
import SavedRoute from './src/screens/Route/SavedRoute';
import SelectedRoute from './src/screens/Route/SelectedRoute';
import WalkDataView from './src/screens/Walk/WalkDataView';

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
                  initialRouteName="Home"
                  screenOptions={{
                      header: NavHead
                  }}
              >
                <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
                <Stack.Screen name="StartPoint" component={StartPoint} options={{ title: 'Set Start Point' }}/>
                <Stack.Screen name="EndPoint" component={EndPoint} options={{ title: 'Set End Point' }}/>
                <Stack.Screen name="StartWalk" component={StartWalk} options={{ title: 'Start your Walk' }}/>
                <Stack.Screen name="Walk" component={Walk} options={{ headerShown: false }} />
                <Stack.Screen name="EndWalk" component={EndWalk} options={{ headerShown: false }} />
                <Stack.Screen name="Routes" component={Routes} options={{ title: 'Select your Route' }}/>
                <Stack.Screen name="SavedRoute" component={SavedRoute} options={{ title: 'View Saved Routes' }}/>
                <Stack.Screen name="SelectedRoute" component={SelectedRoute} options={{ title: 'See Selected Route' }}/>
                <Stack.Screen name="WalkDataView" component={WalkDataView} options={{ title: 'View Past Walks'}}/>
              </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>
    )
}
