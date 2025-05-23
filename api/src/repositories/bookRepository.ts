import { injectable } from 'inversify';
import { IBookRepository } from '../interfaces/IBookRepository';
import { Book } from '../entities/Book';
import { BookModel } from '../models/BookModel';

@injectable()
export class bookRepository implements IBookRepository {
  async locationSlugOnFindBook(location: string): Promise<BookModel[] | null> {
    return await Book.find({
      location: { $regex: new RegExp(location), $options: 'i' },
    });
  }
  async slugOnFindBook(slug: string): Promise<BookModel | null> {
    return await Book.findOne({ slug: slug });
  }
  async searchBook(name: string): Promise<BookModel[] | null> {
    return await Book.find({
      title: { $regex: new RegExp(name), $options: 'i' },
    });
  }
  async createBook({
    book,
  }: {
    book: BookModel;
  }): Promise<BookModel | undefined> {
    return await Book.create(book);
  }
  async getBook({ id }: { id: string }): Promise<BookModel | null> {
    const data = await Book.findById(id);
    return data;
  }
  async getBookList(): Promise<BookModel[] | null> {
    return await Book.find();
  }
  async updateBook({
    id,
    book,
  }: {
    id: string;
    book: BookModel;
  }): Promise<BookModel | null> {
    return await Book.findByIdAndUpdate(id, book);
  }

  async deleteSingleBook(id: string): Promise<BookModel | undefined> {
    const book = await Book.findById(id);
    if (book) {
      await Book.deleteOne({ _id: id });
      return book;
    } else {
      throw new Error('Not found Book');
    }
  }
  async deleteMultiBook(ids: string[]): Promise<BookModel[] | undefined> {
    try {
      const books = await Book.find({ _id: { $in: ids } });
      if (books) {
        await Book.deleteMany({ _id: { $in: ids } });
        return books;
      } else {
        throw new Error('Not found book list');
      }
    } catch (err) {
      throw new Error(err as string);
    }
  }
}
