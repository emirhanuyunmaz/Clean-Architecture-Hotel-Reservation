import { inject, injectable } from 'inversify';
import { IUserInteractor } from '../interfaces/IUserInteractor';
import { UserModel } from '../models/UserModel';
import { IUserRepository } from '../interfaces/IUserRepository';
import { INTERFACE_TYPE } from '../utils';
import { IToken } from '../interfaces/IToken';

@injectable()
export class UserInteractor implements IUserInteractor {
  private repository: IUserRepository;
  private token: IToken;
  constructor(
    @inject(INTERFACE_TYPE.UserRepository) repository: IUserRepository,
    @inject(INTERFACE_TYPE.Token) token: IToken
  ) {
    this.repository = repository;
    this.token = token;
  }

  async multiDeleteUser({ ids }: { ids: [] }): Promise<boolean | null> {
    return await this.repository.multiDeleteUser({ idList: ids });
  }
  async singleDeleteUser({ id }: { id: string }): Promise<boolean | null> {
    return await this.repository.singleDeleteUser({ id: id });
  }
  async searchUser({
    searchText,
  }: {
    searchText: string;
  }): Promise<UserModel[] | null> {
    return await this.repository.searchUser({ searchText: searchText });
  }

  async allUserList(): Promise<UserModel[] | null> {
    return await this.repository.allUserList();
  }

  async createUser(data: UserModel): Promise<UserModel | null> {
    return this.repository.create(data);
  }

  async updateUser(id: String, data: UserModel): Promise<UserModel | null> {
    return this.repository.update(id, data);
  }

  async findUser(id: String): Promise<UserModel[] | null> {
    return this.repository.find(id);
  }

  async findUserEmail({ email }: { email: string }): Promise<UserModel | null> {
    return this.repository.findEmail({ email });
  }

  async loginUser({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<String | null> {
    const user = await this.repository.login({ email, password });
    if (user != null) {
      const userToken = this.token.createToken({
        id: user._id as string,
        admin: user.admin!,
      });
      return userToken;
    }
    return null;
  }

  async changePassword({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<{ email: string; password: string } | null> {
    return await this.repository.changePassword({ email, password });
  }

  async emailCodeSave({
    email,
    code,
  }: {
    email: string;
    code: string;
  }): Promise<{ email: String; code: String } | null | undefined> {
    return await this.repository.emailCodeSave({ email, code });
  }

  async emailCodeVerify({
    email,
    code,
  }: {
    email: string;
    code: string;
  }): Promise<Boolean | null> {
    return await this.repository.emailCodeVerify({ email, code });
  }

  async checkCode({
    code,
  }: {
    code: string;
  }): Promise<{ email: String } | null> {
    return await this.repository.checkCode({ code: code });
  }

  async deleteCode({ code }: { code: string }): Promise<Boolean | null> {
    return await this.repository.deleteCode({ code: code });
  }
}
