import { Router } from 'express';

import ForgotPasswordController from '../../controllers/ForgotPasswordController';
import ResetPasswordController from '../../controllers/ResetPasswordController';

const passwordRoutes = Router();

passwordRoutes.post('/forgot', ForgotPasswordController.create);
passwordRoutes.post('/reset', ResetPasswordController.create);

export default passwordRoutes;