import { injectable } from 'inversify';
import { IUserRepository } from '../interfaces/IUserRepository';
import { UserModel } from '../models/UserModel';
import { User } from '../entities/User';
import { ResetPasswordCode } from '../entities/ResetPassswordCode';

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
  async multiDeleteUser({ idList }: { idList: string[] }): Promise<boolean | null> {
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

  async changePassword({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<{ email: string; password: string } | null> {
    return await User.findOneAndUpdate(
      { email: email },
      { password: password },
      { new: true, projection: { email: 1,password:1 } } 
    )
  }

  async emailCodeSave({
    email,
    code,
  }: {
    email: string;
    code: string;
  }): Promise<{ email: String; code: String } | null | undefined> {
    try {
      return await ResetPasswordCode.create({ email, code });
    } catch (err) {
      throw new Error(err as string);
    }
  }

  async emailCodeVerify({
    email,
    code,
  }: {
    email: string;
    code: string;
  }): Promise<boolean | null> {
    try {
      const data = await ResetPasswordCode.findOne({
        email: email,
        code: code,
      });
      if (data == null) {
        return false;
      } else {
        return true;
      }
    } catch (err) {
      throw new Error(err as string);
    }
  }

  async checkCode({
    code,
  }: {
    code: string;
  }): Promise<{ email: String } | null> {
    const data = await ResetPasswordCode.findOne({ code: code }).select(
      'email'
    );
    return data;
  }

  async deleteCode({ code }: { code: string }): Promise<Boolean | null> {
    try {
      await ResetPasswordCode.deleteOne({ code: code });
      return true;
    } catch (err) {
      throw new Error(err as string);
    }
  }
}
