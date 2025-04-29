import { UserModel } from '../models/UserModel';

export interface IUserRepository {
  create(data: UserModel): Promise<UserModel | null>;
  update(id: String, data: UserModel): Promise<UserModel | null>;
  find(id: String): Promise<UserModel[] | null>;
  login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<UserModel | null>;
  findEmail({ email }: { email: string }): Promise<UserModel | null>;
  allUserList(): Promise<UserModel[] | null>;
  changePassword({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<{ email: string; password: string } | null>;
  searchUser({
    searchText,
  }: {
    searchText: string;
  }): Promise<UserModel[] | null>;
  singleDeleteUser({ id }: { id: string }): Promise<boolean | null>;
  multiDeleteUser({ idList }: { idList: [] }): Promise<boolean | null>;
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
