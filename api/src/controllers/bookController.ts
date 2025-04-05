import { inject } from 'inversify';
import { IBookInteractor } from '../interfaces/IBookInteractor';
import { INTERFACE_TYPE } from '../utils';
import { NextFunction, Request, Response } from 'express';
import { IImagesProcess } from '../interfaces/IImagesProcess';

export class BookController {
  private ineractor: IBookInteractor;
  private imagesProcess: IImagesProcess;

  constructor(
    @inject(INTERFACE_TYPE.BookInteractor) interacter: IBookInteractor,
    @inject(INTERFACE_TYPE.ImagesProcess) imagesProcess: IImagesProcess
  ) {
    this.ineractor = interacter;
    this.imagesProcess = imagesProcess;
  }

  async onCreateBook(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      // console.log(req.body.roomFacilities);

      let newBook = req.body;
      const imageNameList = await this.imagesProcess.uploadMultiImage(
        req.files! as Express.Multer.File[]
      );
      newBook = {
        ...newBook,
        images:imageNameList,
      };
      const data = await this.ineractor.createBook(newBook);
      return res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  }

  async onFindBook(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const id = req.params.id
      if(id != "null"){
        const data = await this.ineractor.getBook({id:id})
        return res.status(200).json(data)
      }
      return res.status(300).json(undefined)
    } catch (err) {
      next(err);
    }
  }

  async onUpdateBook(
    req:Request,res:Response,next:NextFunction
  ):Promise<any>{
    try{
      const {id} = req.body
      const body = req.body
      if(id != undefined){
        const data = await this.ineractor.updataBook({id:id,book:body})
        return res.status(201).json(data)
      }
      return res.status(404).json(undefined)
    }catch(err){
      next(err)
    }
  }

  async updateSingleImage(req:Request,res:Response,next:NextFunction):Promise<any>{
    try{
      const {id , oldImageName} = req.body
      const data = this.ineractor.updateBookSingleImage({id:id,oldImageName:oldImageName,newImage:req.file?.buffer!})
      return res.status(201).json(data)
    }catch(err){
      next(err)
    }
  }

  async deleteSingleImage(req:Request,res:Response,next:NextFunction):Promise<any>{
    try{

      
    }catch(err){
      next(err)
    }
  }

  async allBookList(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { id, admin } = req.headers;
      const data = await this.ineractor.getBookList();
      return res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  async deleteSingleBook(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { id } = req.body;
      if (id) {
        const data = await this.ineractor.deleteSingleBook(id);
        return res.status(200).json(data);
      } else {
        return res.status(300).json({ message: 'Book not found' });
      }
    } catch (err) {
      next(err);
    }
  }

  async deleteMultiBook(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { ids } = req.body;
      if (ids) {
        await this.ineractor.deleteMultiBook(ids);
        return res.status(200).json({});
      } else {
        return res.status(400).json({ message: 'Not found ids' });
      }
    } catch (err) {
      next(err);
    }
  }
}
