import { BookModel } from '../models/BookModel';

export interface IBookRepository {
  createBook({ book }: { book: BookModel }): Promise<BookModel | undefined>;
  getBook({ id }: { id: string }): Promise<BookModel | null>;
  getBookList(): Promise<BookModel[] | null>;
  updateBook({
    id,
    book,
  }: {
    id: string;
    book: BookModel;
  }): Promise<BookModel | null>;
  deleteSingleBook(id: string): Promise<BookModel | undefined>;
  deleteMultiBook(ids: string[]): Promise<BookModel[] | undefined>;
  searchBook(name: string): Promise<BookModel[] | null>;
  slugOnFindBook(slug: string): Promise<BookModel | null>;
  locationSlugOnFindBook(location: string): Promise<BookModel[] | null>;
}
