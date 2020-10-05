import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import SessionController from '../../controllers/SessionController';

const sessionRoutes = Router();

sessionRoutes.post('/', celebrate({
	[Segments.BODY]: {
		email: Joi.string().email().required(),
		password: Joi.string().required()
	}
}), SessionController.create);

export default sessionRoutes;