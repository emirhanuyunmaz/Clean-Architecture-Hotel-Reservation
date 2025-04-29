import { UserModel } from '../models/UserModel';

export interface IUserInteractor {
  createUser(data: UserModel): Promise<UserModel | null>;
  updateUser(id: String, data: UserModel): Promise<UserModel | null>;
  findUser(id: String): Promise<UserModel[] | null>;
  loginUser({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<String | null>;
  findUserEmail({ email }: { email: string }): Promise<UserModel | null>;
  allUserList(): Promise<UserModel[] | null>;
  multiDeleteUser({ ids }: { ids: [] }): Promise<boolean | null>;
  singleDeleteUser({ id }: { id: string }): Promise<boolean | null>;
  searchUser({
    searchText,
  }: {
    searchText: string;
  }): Promise<UserModel[] | null>;
  changePassword({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<{ email: string; password: string } | null>;
  emailCodeSave({
    email,
    code,
  }: {
    email: string;
    code: string;
  }): Promise<{ email: String; code: String } | null | undefined>;
  emailCodeVerify({
    email,
    code,
  }: {
    email: string;
    code: string;
  }): Promise<Boolean | null>;
  checkCode({ code }: { code: string }): Promise<{ email: String } | null>;
  deleteCode({ code }: { code: string }): Promise<Boolean | null>;
}
