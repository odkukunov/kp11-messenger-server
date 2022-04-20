"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const multer_1 = require("multer");
const editFileName = (req, file, callback) => {
    const name = file.originalname.split('.')[0];
    const fileExtName = (0, path_1.extname)(file.originalname);
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
const FileOptions = {
    storage: (0, multer_1.diskStorage)({
        destination: './uploads',
        filename: editFileName,
    }),
    fileFilter: imageFileFilter,
};
exports.default = FileOptions;
//# sourceMappingURL=image.js.map