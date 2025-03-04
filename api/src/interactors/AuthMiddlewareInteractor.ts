import { inject, injectable } from 'inversify';
import { IAuthMiddleware } from '../interfaces/IAuthMiddleware';
import { IToken } from '../interfaces/IToken';
import { INTERFACE_TYPE } from '../utils';

@injectable()
export class AuthMiddlewareInteractor implements IAuthMiddleware {
  private tokenProcess: IToken;

  constructor(@inject(INTERFACE_TYPE.Token) tokenProcess: IToken) {
    this.tokenProcess = tokenProcess;
  }

  authControl({ token }: { token: String }): { id: String; admin: Boolean } {
    return this.tokenProcess.verifyToken(token as string);
  }
}
