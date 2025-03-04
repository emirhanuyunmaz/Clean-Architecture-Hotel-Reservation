import { inject, injectable } from 'inversify';
import { IAuthMiddleware } from '../interfaces/IAuthMiddleware';
import { INTERFACE_TYPE } from '../utils';
import { NextFunction, Request, Response } from 'express';

@injectable()
export class AuthControl {
  private interactor: IAuthMiddleware;

  constructor(
    @inject(INTERFACE_TYPE.AuthMiddlewareInteractor) interactor: IAuthMiddleware
  ) {
    this.interactor = interactor;
  }

  async tokenControl(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { token } = req.headers;
      req.headers.id = this.interactor.authControl({ token: token as string })
        .id as string;
      req.headers.admin = String(
        this.interactor.authControl({ token: token as string }).admin
      );
      return next();
    } catch (err) {
      return res.status(401).json({message:"Unauthorized"});
    }
  }
}
