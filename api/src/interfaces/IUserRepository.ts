import { UserModel } from '../models/UserModel';

export interface IUserRepository {
  create(data: UserModel): Promise<UserModel | null>;
  update(id: String, data: UserModel): Promise<UserModel | null>;
  find(id: String): Promise<UserModel[] | null>;
}
