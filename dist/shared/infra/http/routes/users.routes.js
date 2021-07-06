"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usersRoutes = void 0;

var _upload = require("../../../../config/upload");

var _CreateUserController = require("../../../../modules/accounts/useCases/createUser/CreateUserController");

var _UpdateUserAvatarController = require("../../../../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController");

var _express = require("express");

var _multer = _interopRequireDefault(require("multer"));

var _ensureAuthenticated = require("../middlewares/ensureAuthenticated");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const usersRoutes = (0, _express.Router)();
exports.usersRoutes = usersRoutes;
const upload = (0, _multer.default)(_upload.uploadConfig.upload('avatars', undefined, true));
const createUserController = new _CreateUserController.CreateUserController();
const updateUserAvatarController = new _UpdateUserAvatarController.UpdateUserAvatarController();
usersRoutes.post('/', createUserController.handle);
usersRoutes.use(_ensureAuthenticated.ensureAuthenticated);
usersRoutes.patch('/avatar', upload.single('avatar'), updateUserAvatarController.handle);