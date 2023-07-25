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

export const nameRegex = /^[a-zA-Z]{2,3}[a-zA-Z\s]*$/;
export const phoneRegex = /^[6-9]\d{9}$/;
export const mailRegex = /^\w+[@]{1}\w+(\.[a-zA-Z]{2,3})+$/;
export const passwordRegex = /^[A-Z]{1}[a-zA-Z]+[@$.]{1}[a-zA-Z\d]+$/;
