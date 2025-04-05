import { inject, injectable } from 'inversify';
import { IBookInteractor } from '../interfaces/IBookInteractor';
import { INTERFACE_TYPE } from '../utils';
import { IBookRepository } from '../interfaces/IBookRepository';
import { BookModel } from '../models/BookModel';
import { IImagesProcess } from '../interfaces/IImagesProcess';

@injectable()
export class BookInteractor implements IBookInteractor {
  private repository: IBookRepository;
  private imagesProcess: IImagesProcess;
  constructor(
    @inject(INTERFACE_TYPE.BookRepository) repository: IBookRepository,
    @inject(INTERFACE_TYPE.ImagesProcess) imagesProcess: IImagesProcess
  ) {
    this.repository = repository;
    this.imagesProcess = imagesProcess;
  }
  async updateBookSingleImage({ id, oldImageName, newImage }: { id: string; oldImageName: string; newImage: ArrayBuffer; }): Promise<BookModel | null> {
    const book = await this.repository.getBook({id:id})
    if(book){
      let imageList = book?.images
      await this.imagesProcess.deleteSingleImage(oldImageName)
      const newImageName = await this.imagesProcess.uploadSingleImage(newImage)
      imageList = imageList?.filter(img => img != oldImageName)
      imageList.push(newImageName)
      book!.images = imageList!
      const newBook = await this.repository.updateBook({id,book})
      return newBook
    }else{
      throw new Error("Not found book")
    }
  }

  
  async createBook(book: BookModel): Promise<BookModel | undefined> {
    return await this.repository.createBook({ book: book });
  }
  async updataBook({ id, book }: { id: string; book: BookModel; }): Promise<BookModel | null> {
    return await this.repository.updateBook({id:id,book:book});
  }

  async getBook({ id }: { id: string }): Promise<BookModel | null> {
    const data =  await this.repository.getBook({ id: id });
    return data
  }
  async getBookList(): Promise<BookModel[] | null> {
    return await this.repository.getBookList();
  }
  async deleteSingleBook(id: string): Promise<BookModel | undefined> {
    const data = await this.repository.deleteSingleBook(id);
    this.imagesProcess.deleteMultiImage(data!.images);
    return data;
  }
  async deleteMultiBook(ids: string[]): Promise<BookModel[] | undefined> {
    const data = await this.repository.deleteMultiBook(ids);
    data?.forEach((book) => {
      this.imagesProcess.deleteMultiImage(book.images);
    });
    return data;
  }
}
