import { inject, injectable } from 'inversify';
import { IUserInteractor } from '../interfaces/IUserInteractor';
import { INTERFACE_TYPE } from '../utils';
import { NextFunction, Request, Response } from 'express';

@injectable()
export class UserController {
  private interactor: IUserInteractor;

  constructor(
    @inject(INTERFACE_TYPE.UserInteractor) interactor: IUserInteractor
  ) {
    this.interactor = interactor;
  }

  async onCreateUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const body = req.body;
      // console.log(body);
      const data = await this.interactor.createUser(body);
      return res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  }

  async onFindUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { id } = req.params;
      const data = await this.interactor.findUser(id);
      return res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
}
