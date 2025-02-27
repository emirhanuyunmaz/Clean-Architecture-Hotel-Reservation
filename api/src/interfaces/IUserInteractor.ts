import { UserModel } from '../models/UserModel';

export interface IUserInteractor {
  createUser(data: UserModel): Promise<UserModel | null>;
  updateUser(id: String, data: UserModel): Promise<UserModel | null>;
  findUser(id: String): Promise<UserModel[] | null>;
  loginUser({email,password}:{email:string,password:string}): Promise<String | null>;
  findUserEmail({email}:{email:string}): Promise<UserModel | null>;
}
