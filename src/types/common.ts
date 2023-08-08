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

export type GurukulFormValidationSchemaType = {
  [key: string]: any;
  gurukulData:
    | {
        [key: string]: any;
        gurukulBranch: string;
        attendGurukul: string;
        stdFrom: string;
        stdTo: string;
        sscYear: string;
        hscYear: string;
        knowSaintPersonally: string;
        knowHaribhakt: string;
        RelativeOfSaint: string;
        FromFamily?: string | undefined;
        SaintName?: string | undefined;
        YourRelation?: string | undefined;
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
