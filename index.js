/**
 * @format
 */
import {AppRegistry, Text, TextInput} from 'react-native';
import {name as appName} from './app.json';
import {App} from './src/app';

import './src/localization';
import TrackPlayer from 'react-native-track-player';
import { PlaybackService } from './src/services';

if (Text.defaultProps == null) {
  Text.defaultProps = {};
  Text.defaultProps.allowFontScaling = false;
}

if (TextInput.defaultProps == null) {
  TextInput.defaultProps = {};
  TextInput.defaultProps.allowFontScaling = false;
}

AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerPlaybackService(() => PlaybackService);