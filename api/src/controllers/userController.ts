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
      const nameSurname = req.body['nameSurname'];
      const email = req.body['email'].split(' ').join('');
      const password = req.body['password'];
      const country = req.body['country'];
      const phoneNumber = req.body['phoneNumber'];
      // console.log(nameSurname,email,password,country,phoneNumber);

      const controle = await this.interactor.findUserEmail({ email: email });

      if (controle == null) {
        const data = await this.interactor.createUser({
          nameSurname: nameSurname,
          email: email,
          password: password,
          country: country,
          phoneNumber: phoneNumber,
          admin: false,
          emailIsValid: false,
        });

        return res.status(201).json(data);
      } else {
        return res
          .status(400)
          .json({ error: 'Email has been received before.' });
      }
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
      const { id, admin } = req.headers;
      const data = await this.interactor.findUser(id as string);
      return res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  async getSingleUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { id } = req.params;
      // console.log('GÜncelleme ID :', id);

      if (id != null) {
        const data = await this.interactor.findUser(id);
        // console.log('Aranan kullanıcı :', data);

        if (data) {
          return res.status(200).json(data);
        }
      }
      return res.status(401).json({});
    } catch (err) {
      next(err);
    }
  }

  async onUpdateUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { id, admin } = req.headers;
      const nameSurname = req.body['nameSurname'];
      const email = req.body['email'].split(' ').join('');
      const password = req.body['password'];
      const country = req.body['country'];
      const phoneNumber = req.body['phoneNumber'];
      const gender = req.body['gender'];
      const data = await this.interactor.updateUser(id as string, {
        phoneNumber,
        country,
        email,
        nameSurname,
        password,
        gender,
      });
      return res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  }

  async allUserList(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { id, admin } = req.headers;
      if (admin) {
        const data = await this.interactor.allUserList();
        return res.status(200).json(data);
      } else {
        return res.status(400).json({ message: 'Unauthorize' });
      }
    } catch (err) {
      next(err);
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      let { email, password } = req.body;
      email = email.split(' ').join('');
      const data = await this.interactor.loginUser({ email, password });
      return res.status(200).json({ token: data });
    } catch (err) {
      next(err);
    }
  }

  async singleDeleteUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { admin } = req.headers;
      if (admin == 'true') {
        const { id } = req.body;
        await this.interactor.singleDeleteUser({ id: id });
        return res.status(201).json({});
      }
      return res.status(401).json({});
    } catch (err) {
      next(err);
    }
  }

  async multiDeleteUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { admin } = req.headers;
      if (admin == 'true') {
        const { ids } = req.body;
        await this.interactor.multiDeleteUser({ ids: ids });
        return res.status(201).json({});
      }
      return res.status(401).json({});
    } catch (err) {
      next(err);
    }
  }

  async searchUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { admin } = req.headers;

      if (admin == 'true') {
        const { searchText } = req.params;
        const data = await this.interactor.searchUser({
          searchText: searchText,
        });
        return res.status(201).json(data);
      }
      return res.status(401).json();
    } catch (err) {
      next(err);
    }
  }
}
