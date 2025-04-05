export interface IImagesProcess {
  uploadSingleImage(data: ArrayBuffer): Promise<string>;
  deleteSingleImage(imageName: string): Promise<boolean>;
  updateSingleImage(data: ArrayBuffer, imageName: string): Promise<boolean>;
  uploadMultiImage(data: Express.Multer.File[]): Promise<string[]>;
  deleteMultiImage(imagesName: string[]): Promise<boolean>;
}
