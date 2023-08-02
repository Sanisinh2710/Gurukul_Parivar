import {EnglishJSON} from '../localization/en';

export type Theme = {
  isDark: boolean;
  primary: string;
  statusBarBackground: string;
  headerBarBackground: string;
  background: string;
  iconColor: string;
  iconBackground: string;
  textColor: string;
  textSubtitleColor: string;
};

export type CustomNameSpace = typeof EnglishJSON;

export type LoginFormValidationSchemaType = {
  mobileNumber: string;
};

export type CompleteProfileFormValidationSchemaType = {
  [key: string]: any;
  profilePic: string | undefined;
  gurukulName: string;
};

export type AddressFormValidationSchemaType = {
  [key: string]: any;
  country: string | undefined;
  address: string;
  pincode: string;
  cityVillage: string;
};
export type InitialThemeType = {theme: Theme; themeMode: string};
