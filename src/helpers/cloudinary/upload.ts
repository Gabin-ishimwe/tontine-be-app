import { BadRequestException } from '@nestjs/common';
import * as cron from 'node-cron';
import { afterOneSec } from '../otp/generate_otp';
import cloudinary from './config';

const FOLDER = 'TontinoProfile';

// Upload file image to cloudinary
export const uploadImage = async (image: string) => {
  try {
    const result = await cloudinary.uploader.upload(image, {
      folder: FOLDER,
      resource_type: 'image',
      unique_filename: true,
    });
    return result.secure_url;
  } catch (error) {
    let message: string;
    if (error.http_code === 400) {
      message = 'Invalid image file, unable to upload';
    } else if (error.error?.code === 'ENOENT') {
      message = 'No such file or directory';
    } else if (error.http_code === 404) {
      message = 'Resource not found, unable to upload image';
    } else if (error.http_code === 401) {
      message = 'Unauthorized action, unable to upload image';
    }
    throw new BadRequestException(
      message || error.message || 'Unknown error while uploading image',
    );
  }
};

export const deleteImageTask = (name: string, imageUrl: string) => {
  return cron.schedule(afterOneSec(), async () => {
    // Delete file image from cloudinary
    if (!(await deleteImage(imageUrl))) {
      console.log('Delete image failed,', name);
    } else {
      console.log('CLOUDINARY: Image deleted successfully,', name);
    }
  });
};

// Delete file image from cloudinary
const deleteImage = async (imageUrl: string) => {
  try {
    const publicId = `${FOLDER}` + imageUrl.split(FOLDER)[1].split('.')[0];
    const response = await cloudinary.uploader.destroy(publicId, {
      resource_type: 'image',
    });
    if (response.result === 'ok') {
      return true;
    } else if (response.result === 'not found') {
      console.log('CLOUDINARY: Image not found');
    }
    return false;
  } catch (error) {
    console.log('CLOUDINARY: Uncaught error happened while deleting image');
    return false;
  }
};
