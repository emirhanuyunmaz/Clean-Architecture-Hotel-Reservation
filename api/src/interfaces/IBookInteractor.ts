import { BookModel } from '../models/BookModel';

export interface IBookInteractor {
  createBook(book: BookModel): Promise<BookModel | undefined>;
  updataBook({
    id,
    book,
  }: {
    id: string;
    book: BookModel;
  }): Promise<BookModel | null>;
  updateBookSingleImage({
    id,
    oldImageName,
    newImage,
  }: {
    id: string;
    oldImageName: string;
    newImage: ArrayBuffer;
  }): Promise<BookModel | null>;
  getBook({ id }: { id: string }): Promise<BookModel | null>;
  getBookList(): Promise<BookModel[] | null>;
  deleteSingleBook(id: string): Promise<BookModel | undefined>;
  deleteMultiBook(ids: string[]): Promise<BookModel[] | undefined>;
  addNewSingleImage({
    id,
    newImage,
  }: {
    id: string;
    newImage: ArrayBuffer;
  }): Promise<BookModel | null>;
  deleteBookSingleImage({
    id,
    imageName,
  }: {
    id: string;
    imageName: string;
  }): Promise<BookModel | null>;

  searchBook(name: string): Promise<BookModel[] | null>;
}
