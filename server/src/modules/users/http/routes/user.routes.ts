import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../../../../config/upload';

import UsersController from '../../controllers/UsersController';
import UserAvatarController from '../../controllers/UserAvatarController';
import ensureAuthenticated from './../middlewares/ensureAuthenticated';

const userRoutes = Router();

const upload = multer(uploadConfig);

userRoutes.get('/', UsersController.read);
userRoutes.post('/', UsersController.create);

userRoutes.patch('/avatar', ensureAuthenticated, upload.single('avatar'), UserAvatarController.update);

export default userRoutes;