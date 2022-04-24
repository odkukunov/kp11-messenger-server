import { extname } from 'path';
import { diskStorage } from 'multer';
import { BadRequestException } from '@nestjs/common';

const editFileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${name}-${randomName}${fileExtName}`);
};

const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    console.log('Файл должен быть картинкой');
  }
  callback(null, true);
};

export const AllFilesOptions = {
  storage: diskStorage({
    destination: './uploads/messages',
    filename: editFileName,
  }),
  limits: { fileSize: 20000000 },
};

const FileOptions = {
  storage: diskStorage({
    destination: './uploads',
    filename: editFileName,
  }),
  fileFilter: imageFileFilter,
};

export default FileOptions;
