import express from 'express';
import { Container } from 'inversify';
import { IUserRepository } from '../interfaces/IUserRepository';
import { INTERFACE_TYPE } from '../utils';
import { UserInteractor } from '../interactors/UserInteractor';
import { UserRepository } from '../repositories/userRepository';
import { IUserInteractor } from '../interfaces/IUserInteractor';
import { UserController } from '../controllers/userController';
import { IToken } from '../interfaces/IToken';
import { Token } from '../external-libraries/Token';
import { IAuthMiddleware } from '../interfaces/IAuthMiddleware';
import { AuthMiddlewareInteractor } from '../interactors/AuthMiddlewareInteractor';
import { AuthControl } from '../middleware/AuthControl';
import { ISendEmail } from '../interfaces/ISendEmail';
import { SendEmail } from '../external-libraries/SendEmail';

const container = new Container();

container.bind<IToken>(INTERFACE_TYPE.Token).to(Token);

container.bind<ISendEmail>(INTERFACE_TYPE.SendEmail).to(SendEmail);

container
  .bind<IAuthMiddleware>(INTERFACE_TYPE.AuthMiddlewareInteractor)
  .to(AuthMiddlewareInteractor);

container
  .bind<IUserRepository>(INTERFACE_TYPE.UserRepository)
  .to(UserRepository);

container
  .bind<IUserInteractor>(INTERFACE_TYPE.UserInteractor)
  .to(UserInteractor);

container.bind(INTERFACE_TYPE.UserController).to(UserController);
container.bind(INTERFACE_TYPE.AuthControl).to(AuthControl);

const router = express.Router();

const controller = container.get<UserController>(INTERFACE_TYPE.UserController);
const authController = container.get<AuthControl>(INTERFACE_TYPE.AuthControl);

router.post('/createUser', controller.onCreateUser.bind(controller));
router.post('/login', controller.login.bind(controller));
router.get(
  '/findUser',
  authController.tokenControl.bind(authController),
  controller.onFindUser.bind(controller)
);
router.get(
  '/getSingleUser/:id',
  authController.tokenControl.bind(authController),
  controller.getSingleUser.bind(controller)
);
router.get(
  '/allUser',
  authController.tokenControl.bind(authController),
  controller.allUserList.bind(controller)
);
router.get(
  '/searchUser/:searchText',
  authController.tokenControl.bind(authController),
  controller.searchUser.bind(controller)
);
router.post(
  '/updateUser',
  authController.tokenControl.bind(authController),
  controller.onUpdateUser.bind(controller)
);
router.delete(
  '/singleDeleteUser',
  authController.tokenControl.bind(authController),
  controller.singleDeleteUser.bind(controller)
);
router.delete(
  '/multiDeleteUser',
  authController.tokenControl.bind(authController),
  controller.multiDeleteUser.bind(controller)
);

router.post(
  '/sendEmailResetPassword',
  controller.sendEmailResetPassword.bind(controller)
);

router.post('/resetPassword', controller.resetPassword.bind(controller));

export default router;
