import { injectable } from 'inversify';
import { IImagesProcess } from '../interfaces/IImagesProcess';
import sharp from 'sharp';
import crypto from 'crypto';
import fs from 'fs';

@injectable()
export class ImagesProcess implements IImagesProcess {
  async uploadSingleImage(data: ArrayBuffer): Promise<string> {
    try {
      const imageName = `/${crypto.randomUUID()}.png`;
      const imagesPath = __dirname + '/../../uploads' + imageName;
      await sharp(data).toFile(imagesPath);
      return imageName;
    } catch (err) {
      throw new Error(err as string);
    }
  }
  async deleteSingleImage(imageName: string): Promise<boolean> {
    try {
      const imagesPath = __dirname + '/../../uploads' + imageName;
      fs.rm(imagesPath, function (err) {
        if (err) {
          throw new Error(err.message);
        }
      });
      return true;
    } catch (err) {
      return false;
    }
  }
  async updateSingleImage(
    data: ArrayBuffer,
    imageName: string
  ): Promise<boolean> {
    try {
      const imageName = `/${crypto.randomUUID()}.png`;
      const imagesPath = __dirname + '/../../uploads' + imageName;
      await sharp(data).toFile(imagesPath);
      return true;
    } catch (err) {
      return false;
    }
  }
  async uploadMultiImage(data: Express.Multer.File[]): Promise<string[]> {
    try {
      // console.log(data);

      let imageNameList = [];
      for (let i = 0; i < data.length; i++) {
        const imageName = `/${crypto.randomUUID()}.png`;
        const imagesPath = __dirname + '/../../uploads' + imageName;
        await sharp(data[i].buffer).toFile(imagesPath);
        imageNameList.push(imageName);
      }
      return imageNameList;
    } catch (err) {
      throw new Error(err as string);
    }
  }
  async deleteMultiImage(imagesName: string[]): Promise<boolean> {
    try {
      imagesName.forEach((image) => {
        const imagesPath = __dirname + '/../../uploads' + image;
        fs.rm(imagesPath, function (err) {
          if (err) {
            throw new Error(err.message);
          }
        });
      });
      return true;
    } catch (err) {
      return false;
    }
  }
}
