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

export type UserAddress = {
  id?: string | undefined;
  country: string;
  address: string;
  pincode: string;
  cityVillage: string;
  typeofAddress: string;
  communicationAddr?: boolean;
};

export type AddressFormValidationSchemaType = {
  addressInfo: UserAddress[];
};
export type InitialThemeType = {theme: Theme; themeMode: string};

export type PersonalInfoFormValidationSchemaType = {
  gender: string;
  fullname: string;
  fatherFullName: string;
  dob: string;
  bloodGroup: string;
  mobilenumInfo: {
    mobilenum: string | undefined;
    whatsappNum?: boolean | undefined;
    secondary?: boolean | undefined;
    countryCode?: string | undefined;
  }[];
  emailInfo: {
    email: string;
    secondary?: boolean | undefined;
  }[];
};

export type EduBusinessInfoValidationSchemaType = {
  maxEduLevel: string;
  occupation: string;
  occupationType: string;
  skills: string[];
  otherComment: string;
};

export type SupportedFormInputTypes =
  | 'phone'
  | 'number'
  | 'text'
  | 'select'
  | 'photo'
  | 'radio'
  | 'dob'
  | 'date'
  | 'textarea'
  | 'email'
  | 'multi-select';
