import { UserModel } from '../models/UserModel';

export interface IUserRepository {
  create(data: UserModel): Promise<UserModel | null>;
  update(id: String, data: UserModel): Promise<UserModel | null>;
  find(id: String): Promise<UserModel[] | null>;
  login({email,password}:{email:string,password:string}): Promise<UserModel | null>;
  findEmail({email}:{email:string}): Promise<UserModel | null>;
}
