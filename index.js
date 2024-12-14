/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import AsyncStorageDemoPage from './js/AsyncStorageDemoPage';
import RegistrationPage from './js/page/RegistrationPage';
import 'react-native-gesture-handler';
import AppNavigators from './js/navigator/AppNavigators';
import App from './js/App';
AppRegistry.registerComponent(appName, () => App);
