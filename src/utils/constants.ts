import {Theme} from '../types';
import {COLORS} from './colors';

const LightTheme: Theme = {
  isDark: false,
  statusBarBackground: COLORS.lightModeStatusBarColor,
  background: COLORS.lightModeBackgroundColor,
  primary: COLORS.primaryColor,
  iconColor: COLORS.leftArrowBg,
  textColor: COLORS.lightModetextColor,
  textSubtitleColor: COLORS.lighttextSubtitleColor,
  headerBarBackground: COLORS.lightModeBackgroundColor,
  iconBackground: COLORS.leftArrowBg,
};
const DarkTheme: Theme = {
  isDark: true,
  statusBarBackground: COLORS.darkModeStatusBarcolor,
  background: COLORS.darkModeBackgroundcolor,
  primary: COLORS.primaryColor,
  iconColor: COLORS.darkModeIconColor,
  textColor: COLORS.darkModetextColor,
  textSubtitleColor: COLORS.darktextSubtitleColor,
  headerBarBackground: COLORS.darkModeBackgroundcolor,
  iconBackground: COLORS.leftArrowBg,
};

export const GurukulTheme: {[key: string]: Theme} = {
  light: LightTheme,
  dark: DarkTheme,
};
