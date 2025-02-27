export interface UserModel {
  _id?: string;
  nameSurname: string;
  email: string;
  password: string;
  phoneNumber: string;
  country: string;
  emailIsValid: boolean;
  admin:boolean;
}
