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
  profilePic: string | undefined;
  gurukulName: string;
};

export type UserAddress = {
  id?: number | undefined;
  country_id: number;
  address: string;
  pincode: number;
  city: string;
  address_type: string;
  communicationAddr?: boolean;
};

export type AddressFormValidationSchemaType = {
  address_details: UserAddress[];
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
