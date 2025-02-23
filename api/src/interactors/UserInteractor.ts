import { inject, injectable } from 'inversify';
import { IUserInteractor } from '../interfaces/IUserInteractor';
import { UserModel } from '../models/UserModel';
import { IUserRepository } from '../interfaces/IUserRepository';
import { INTERFACE_TYPE } from '../utils';

@injectable()
export class UserInteractor implements IUserInteractor {
  private repository: IUserRepository;

  constructor(
    @inject(INTERFACE_TYPE.UserRepository) repository: IUserRepository
  ) {
    this.repository = repository;
  }

  createUser(data: UserModel): Promise<UserModel | null> {
    return this.repository.create(data);
  }

  updateUser(id: String, data: UserModel): Promise<UserModel | null> {
    return this.repository.update(id, data);
  }

  findUser(id: String): Promise<UserModel[] | null> {
    return this.repository.find(id);
  }
}
