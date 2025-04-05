import { injectable } from 'inversify';
import { IUserRepository } from '../interfaces/IUserRepository';
import { UserModel } from '../models/UserModel';
import { User } from '../entities/User';

@injectable()
export class UserRepository implements IUserRepository {
  async searchUser({
    searchText,
  }: {
    searchText: string;
  }): Promise<UserModel[] | null> {
    return await User.find({
      nameSurname: { $regex: new RegExp(searchText), $options: 'i' },
    });
  }
  async singleDeleteUser({ id }: { id: string }): Promise<boolean | null> {
    try {
      await User.deleteOne({ _id: id });
      return true;
    } catch (err) {
      return false;
    }
  }
  async multiDeleteUser({ idList }: { idList: [] }): Promise<boolean | null> {
    try {
      await User.deleteMany({ _id: { $in: idList } });
      return true;
    } catch (err) {
      return false;
    }
  }

  async allUserList(): Promise<UserModel[] | null> {
    return await User.find();
  }
  async create(data: UserModel): Promise<UserModel | null> {
    return await User.create(data);
  }
  async update(id: string, data: UserModel): Promise<UserModel | null> {
    return await User.findByIdAndUpdate(id, data);
  }
  async find(id: string): Promise<UserModel[] | null> {
    return await User.findById(id);
  }
  async login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<UserModel | null> {
    return await User.findOne({ email: email, password: password });
  }
  async findEmail({ email }: { email: string }): Promise<UserModel | null> {
    return await User.findOne({ email: email });
  }
}
