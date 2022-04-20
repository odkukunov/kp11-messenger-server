/// <reference types="multer" />
declare const FileOptions: {
    storage: import("multer").StorageEngine;
    fileFilter: (req: any, file: any, callback: any) => void;
};
export default FileOptions;
