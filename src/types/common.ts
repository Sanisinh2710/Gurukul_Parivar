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
  addressInfo:
    | {
        [key: string]: any;
        id?: string | undefined;
        country: string;
        address: string;
        pincode: string;
        cityVillage: string;
        typeofAddress: string;
      }[]
    | undefined;
};
export type InitialThemeType = {theme: Theme; themeMode: string};

export type PersonalInfoFormValidationSchemaType = {
  [key: string]: any;
  gender: string;
  fullname: string;
  fatherFullName: string;
  dob: string;
  bloodGroup: string;
  mobilenum: string;
  secondaryMobileNum: string | undefined;
  email: string;
  secondaryEmail: string | undefined;
};
