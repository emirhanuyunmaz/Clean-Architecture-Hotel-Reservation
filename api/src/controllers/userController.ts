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
      const nameSurname = req.body["nameSurname"]
      const email = req.body["email"].split(" ").join("");
      const password = req.body["password"]
      const country = req.body["country"]
      const phoneNumber = req.body["phoneNumber"]

      const controle = await this.interactor.findUserEmail({email:email})
      
      if (controle == null){
        const data = await this.interactor.createUser({
          nameSurname:nameSurname,
          email:email,
          password:password,
          country:country,
          phoneNumber:phoneNumber,
          admin:false,
          emailIsValid:false
        });
      
        return res.status(201).json(data);
      } else {
        return res.status(400).json({error:"Email has been received before."});
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
      const { id } = req.params;
      const data = await this.interactor.findUser(id);
      return res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  async login(
    req:Request,
    res:Response,
    next:NextFunction
  ):Promise<any>{
    try{
      let {email,password} = req.body;
      email = email.split(" ").join("")
      const data = await this.interactor.loginUser({email,password})
      return res.status(200).json({token:data});
    }catch(err){
      next(err);
    }
  }

}
