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
  typeofAddress: string;
};
export type InitialThemeType = {theme: Theme; themeMode: string};

export type PersonalInfoFormValidationSchemaType = {
  [key: string]: any;
  gender: string;
  fullname: string;
  fatherFullName: string;
  dob: string;
  bloodGroup: string;
  mobilenumInfo:
    | {
        mobilenum: string | undefined;
        whatsappNum?: boolean | undefined;
        secondary?: boolean | undefined;
        countryCode?: string | undefined;
      }[]
    | undefined;
  emailInfo:
    | {
        email: string;
        secondary?: boolean | undefined;
      }[]
    | undefined;
};
