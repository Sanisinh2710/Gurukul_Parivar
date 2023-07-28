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

export type LoginValidationSchemaType = {
  mobileNumber: string;
};

export type CompleteProfileValidationSchemaType = {
  [key: string]: string;
  profilePic: string;
  gurukulName: string;
};
