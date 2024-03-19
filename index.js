/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import BugsnagPerformance from '@bugsnag/react-native-performance'

BugsnagPerformance.start('9653b00b46af889ec3216dee256e6ab9')
AppRegistry.registerComponent(appName, () => App);
