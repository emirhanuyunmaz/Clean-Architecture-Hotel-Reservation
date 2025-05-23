import { inject } from 'inversify';
import { IBookInteractor } from '../interfaces/IBookInteractor';
import { INTERFACE_TYPE } from '../utils';
import { NextFunction, Request, Response } from 'express';
import { IImagesProcess } from '../interfaces/IImagesProcess';
import { IRoomPricePayment } from '../interfaces/IRoomPricePayment';
import { IBookReservationInteractor } from '../interfaces/IBookReservationInteractor';

export class BookController {
  private ineractor: IBookInteractor;
  private imagesProcess: IImagesProcess;
  private paymentPrice: IRoomPricePayment
  private bookReservationInteractor : IBookReservationInteractor

  constructor(
    @inject(INTERFACE_TYPE.BookInteractor) interacter: IBookInteractor,
    @inject(INTERFACE_TYPE.ImagesProcess) imagesProcess: IImagesProcess,
    @inject(INTERFACE_TYPE.RoomPricePayment) paymentPrice: IRoomPricePayment,
    @inject(INTERFACE_TYPE.BookReservationInteractor) bookReservationInteractor: IBookReservationInteractor,
  ) {
    this.ineractor = interacter;
    this.imagesProcess = imagesProcess;
    this.paymentPrice = paymentPrice;
    this.bookReservationInteractor = bookReservationInteractor
  }

  async onCreateBook(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      let newBook = req.body;
      const imageNameList = await this.imagesProcess.uploadMultiImage(
        req.files! as Express.Multer.File[]
      );
      newBook = {
        ...newBook,
        images: imageNameList,
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
      const id = req.params.id;
      if (id != 'null') {
        
        const data = await this.ineractor.getBook({ id: id });
        return res.status(200).json(data);
      }
      return res.status(300).json(undefined);
    } catch (err) {
      next(err);
    }
  }

  async slugOnFindBook(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { slug } = req.params;
      if (slug) {
        const data = await this.ineractor.onFindSlugBook(slug);

        if (data) {
          return res.status(200).json(data);
        } else {
          return res.status(404).json({ message: 'Not Found book' });
        }
      }
      return res.status(404).json({ message: 'Not Found book' });
    } catch (err) {
      next(err);
    }
  }

  async locationOnFindBook(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const location = req.query.location;
      // console.log("LOCATION::::",location);

      if (location) {
        const data = await this.ineractor.onFindLocationBook(
          location as string
        );
        // console.log(data);
        res.status(200).json(data);
      } else {
        const data = await this.ineractor.getBookList();
        res.status(200).json(data);
      }
    } catch (err) {
      console.log('ERR::', err);

      next(err);
    }
  }

  async onUpdateBook(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { id } = req.body;
      const body = req.body;
      if (id != undefined) {
        const data = await this.ineractor.updataBook({ id: id, book: body });
        return res.status(201).json(data);
      }
      return res.status(404).json(undefined);
    } catch (err) {
      next(err);
    }
  }

  async updateSingleImage(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { id, oldImageName } = req.body;
      const data = await this.ineractor.updateBookSingleImage({
        id: id,
        oldImageName: oldImageName,
        newImage: req.file?.buffer!,
      });
      return res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  }

  async searchBook(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { searchText } = req.body;
      const data = await this.ineractor.searchBook(searchText);
      return res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  async addSingleImage(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      console.log('New single image');

      const { id } = req.body;

      const data = await this.ineractor.addNewSingleImage({
        id: id,
        newImage: req.file?.buffer!,
      });
      return res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  }

  async deleteSingleImage(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { imageName, id } = req.body;
      const data = await this.ineractor.deleteBookSingleImage({
        id: id,
        imageName: imageName,
      });
      return res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  }

  async allBookList(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { id, admin } = req.headers;
      const searchText = req.query.searchText;
      console.log(searchText);
      if (searchText) {
        const data = await this.ineractor.searchBook(searchText as string);
        res.status(200).json(data);
      } else {
        const data = await this.ineractor.getBookList();
        return res.status(200).json(data);
      }
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

  async bookReservationPayment(req:Request,res:Response,next:NextFunction):Promise<any>{
    try{
      const data = req.body
      const userID = req.headers.id
      const paymentRes = await this.paymentPrice.totalPayment(data)
      
      if(paymentRes){
        await this.bookReservationInteractor.addReservation({bookID:data.Reservation.bookID,endDay:data.Reservation.endDay,isPayment:paymentRes,startDay:data.Reservation.startDay,totalPrice:data.Price.roomPrice*data.Price.totalDay,userID:userID as string})
        
        return res.status(201).json({message:"Success payment"})
      }
      else{
        return res.status(400).json({message:"Payment Error"})
      }

      }catch(err){
      next(err)
    }
  }

  async userReservationList(req:Request,res:Response,next:NextFunction):Promise<any>{
    try{
      const id = req.headers.id
      const data = await this.bookReservationInteractor.getUserReservationList(id as string)      
      return res.status(200).json(data)
    }catch(err){
      next(err)
    }
  }

}
