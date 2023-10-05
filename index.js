/**
 * @format
 */
import {App} from '@app';
import {AppRegistry, Text, TextInput} from 'react-native';
import {name as appName} from './app.json';

import '@localization';
import {PlaybackService} from '@services';
import TrackPlayer from 'react-native-track-player';

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
