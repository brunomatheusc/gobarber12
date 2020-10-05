import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../../../../config/upload';

import UsersController from '../../controllers/UsersController';
import UserAvatarController from '../../controllers/UserAvatarController';
import ensureAuthenticated from './../middlewares/ensureAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';

const userRoutes = Router();

const upload = multer(uploadConfig);

userRoutes.get('/', UsersController.read);
userRoutes.post('/', celebrate({
	[Segments.BODY]: {
		name: Joi.string().required(),
		email: Joi.string().email().required(),
		password: Joi.string().required()
	}
}), UsersController.create);

userRoutes.post('/avatar', ensureAuthenticated, upload.single('avatar'), UserAvatarController.update);

export default userRoutes;