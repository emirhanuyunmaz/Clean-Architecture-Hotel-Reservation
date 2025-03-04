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
        admin: user.admin,
      });
      return userToken;
    }
    return null;
  }
}
