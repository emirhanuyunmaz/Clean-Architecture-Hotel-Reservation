import { UserModel } from '../models/UserModel';

export interface IUserInteractor {
  createUser(data: UserModel): Promise<UserModel | null>;
  updateUser(id: String, data: UserModel): Promise<UserModel | null>;
  findUser(id: String): Promise<UserModel[] | null>;
}
