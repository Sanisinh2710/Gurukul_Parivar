/**
 * @format
 */
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
// import { App } from './src/app';
import {LoginOTP} from './src/screens';
import './src/localization/i18n';

AppRegistry.registerComponent(appName, () => LoginOTP);
