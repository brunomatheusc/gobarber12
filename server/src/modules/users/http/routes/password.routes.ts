import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import ForgotPasswordController from '../../controllers/ForgotPasswordController';
import ResetPasswordController from '../../controllers/ResetPasswordController';

const passwordRoutes = Router();

passwordRoutes.post('/forgot', celebrate({
	[Segments.BODY]: {
		email: Joi.string().required()
	}
}), ForgotPasswordController.create);

passwordRoutes.post('/reset', celebrate({
	[Segments.BODY]: {
		token: Joi.string().uuid().required(),
		password: Joi.string().required(),
		password_confirmation: Joi.string().required().valid(Joi.ref('password')),
	}
}), ResetPasswordController.create);

export default passwordRoutes;