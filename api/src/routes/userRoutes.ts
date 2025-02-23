import express from 'express';
import { Container } from 'inversify';
import { IUserRepository } from '../interfaces/IUserRepository';
import { INTERFACE_TYPE } from '../utils';
import { UserInteractor } from '../interactors/UserInteractor';
import { UserRepository } from '../repositories/userRepository';
import { IUserInteractor } from '../interfaces/IUserInteractor';
import { UserController } from '../controllers/userController';

const container = new Container();

container
  .bind<IUserRepository>(INTERFACE_TYPE.UserRepository)
  .to(UserRepository);

container
  .bind<IUserInteractor>(INTERFACE_TYPE.UserInteractor)
  .to(UserInteractor);

container.bind(INTERFACE_TYPE.UserController).to(UserController);

const router = express.Router();

const controller = container.get<UserController>(INTERFACE_TYPE.UserController);

router.post('/createUser', controller.onCreateUser.bind(controller));
router.get('/findUser/:id', controller.onFindUser.bind(controller));

export default router;
