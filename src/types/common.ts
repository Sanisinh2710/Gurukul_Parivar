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
  [key: string]: string;
  mobileNumber: string;
};

export type CompleteProfileFormValidationSchemaType = {
  [key: string]: any;
  profile: any;
  branch_id: number;
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

export type SingleGurukulRecType = {
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
};

export type GurukulFormValidationSchemaType = {
  [key: string]: any;
  gurukulData: SingleGurukulRecType[] | undefined;
};

export type InitialThemeType = {theme: Theme; themeMode: string};

export type PersonalInfoFormValidationSchemaType = {
  gender: string;
  full_name: string;
  father_name: string;
  dob: string;
  blood_group: string;
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
  otherComment?: string | undefined;
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
