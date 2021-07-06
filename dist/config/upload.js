"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadConfig = void 0;

var _crypto = require("crypto");

var _multer = require("multer");

var _path = require("path");

var _AppError = require("../shared/errors/AppError");

const tmpFolder = (0, _path.resolve)(__dirname, '..', '..', 'tmp');
const avatarFolder = (0, _path.resolve)(__dirname, '..', '..', 'tmp', 'avatars');
const uploadConfig = {
  driver: process.env.STORAGE_DRIVER || 'disk',
  tmpFolder,
  avatarFolder,

  upload(folder, limit, isImage) {
    return {
      limits: {
        fileSize: limit || 3145728
      },
      fileFilter: (req, file, cb) => {
        if (isImage) {
          const regex = new RegExp('image/w*');

          if (!regex.test(file.mimetype)) {
            cb(new _AppError.AppError('Image format is not valid', 401));
          }
        }

        cb(null, true);
      },
      storage: (0, _multer.diskStorage)({
        destination: (0, _path.resolve)(__dirname, '..', '..', 'tmp', folder),
        filename: (req, file, cb) => {
          const hash = (0, _crypto.randomBytes)(10).toString('hex');
          const name = `${hash}-${file.originalname}`;
          return cb(null, name);
        }
      })
    };
  },

  config: {
    disk: {},
    aws: {
      bucket: 'rentx'
    }
  }
};
exports.uploadConfig = uploadConfig;