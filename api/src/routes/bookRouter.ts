import { Container } from 'inversify';
import express from 'express';
import { IToken } from '../interfaces/IToken';
import { INTERFACE_TYPE } from '../utils';
import { Token } from '../external-libraries/Token';
import { IAuthMiddleware } from '../interfaces/IAuthMiddleware';
import { AuthMiddlewareInteractor } from '../interactors/AuthMiddlewareInteractor';
import { IBookRepository } from '../interfaces/IBookRepository';
import { bookRepository } from '../repositories/bookRepository';
import { IBookInteractor } from '../interfaces/IBookInteractor';
import { BookInteractor } from '../interactors/BookInteractor';
import { BookController } from '../controllers/bookController';
import { AuthControl } from '../middleware/AuthControl';
import multer from 'multer';
import { ImagesProcess } from '../external-libraries/ImagesProcess';
import { IImagesProcess } from '../interfaces/IImagesProcess';
import { RoomPricePayment } from '../external-libraries/RoomPricePayment';
import { IRoomPricePayment } from '../interfaces/IRoomPricePayment';
import { IBookReservationRepository } from '../interfaces/IBookReservationRepository';
import { bookReservationRepository } from '../repositories/BookReservationRepository';
import { IBookReservationInteractor } from '../interfaces/IBookReservationInteractor';
import { BookReservationInteractor } from '../interactors/BookReservationInteractor';

const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Please upload a valid image file'));
    }
    cb(null, true);
  },
});

const container = new Container();

container.bind<IToken>(INTERFACE_TYPE.Token).to(Token);

container.bind<IImagesProcess>(INTERFACE_TYPE.ImagesProcess).to(ImagesProcess);

container
  .bind<IAuthMiddleware>(INTERFACE_TYPE.AuthMiddlewareInteractor)
  .to(AuthMiddlewareInteractor);

container
  .bind<IBookRepository>(INTERFACE_TYPE.BookRepository)
  .to(bookRepository);

container
  .bind<IBookReservationRepository>(INTERFACE_TYPE.BookReservationRepository)
  .to(bookReservationRepository);

  container
  .bind<IRoomPricePayment>(INTERFACE_TYPE.RoomPricePayment)
  .to(RoomPricePayment);

container
  .bind<IBookInteractor>(INTERFACE_TYPE.BookInteractor)
  .to(BookInteractor);

container
  .bind<IBookReservationInteractor>(INTERFACE_TYPE.BookReservationInteractor)
  .to(BookReservationInteractor);

container.bind(INTERFACE_TYPE.BookController).to(BookController);
container.bind(INTERFACE_TYPE.AuthControl).to(AuthControl);

const router = express.Router();

const controller = container.get<BookController>(INTERFACE_TYPE.BookController);
const authController = container.get<AuthControl>(INTERFACE_TYPE.AuthControl);

router.post(
  '/createBook',
  upload.array('images'),
  controller.onCreateBook.bind(controller)
);

router.get(
  '/bookList',
  authController.tokenControl.bind(authController),
  controller.allBookList.bind(controller)
);

router.get(
  '/book/:id',
  authController.tokenControl.bind(authController),
  controller.onFindBook.bind(controller)
);

router.get(
  '/singleBook/:slug',
  // authController.tokenControl.bind(authController),
  controller.slugOnFindBook.bind(controller)
);

router.get(
  '/searchLocationBook',
  controller.locationOnFindBook.bind(controller)
);

router.post(
  '/updateBook',
  authController.tokenControl.bind(authController),
  controller.onUpdateBook.bind(controller)
);

router.post(
  '/updateBookImage',
  authController.tokenControl.bind(authController),
  upload.single('newImage'),
  controller.updateSingleImage.bind(controller)
);

router.post(
  '/deleteBookSingleImage',
  authController.tokenControl.bind(authController),
  controller.deleteSingleImage.bind(controller)
);

router.post(
  '/addBookSingleImage',
  authController.tokenControl.bind(authController),
  upload.single('newImage'),
  controller.addSingleImage.bind(controller)
);

router.delete(
  '/deleteSingleBook',
  authController.tokenControl.bind(authController),
  controller.deleteSingleBook.bind(controller)
);

router.delete(
  '/deleteMultiBook',
  authController.tokenControl.bind(authController),
  controller.deleteMultiBook.bind(controller)
);

router.post(
  '/paymentPrice',
  authController.tokenControl.bind(authController),
  controller.bookReservationPayment.bind(controller)
);

router.get(
  '/userBookList',
  authController.tokenControl.bind(authController),
  controller.userReservationList.bind(controller)
);

export default router;
