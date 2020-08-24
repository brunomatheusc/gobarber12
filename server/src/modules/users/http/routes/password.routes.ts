import { Router } from 'express';

import ForgotPasswordController from 'modules/users/controllers/ForgotPasswordController';
import ResetPasswordController from 'modules/users/controllers/ResetPasswordController';

const passwordRoutes = Router();

passwordRoutes.post('/forgot', ForgotPasswordController.create);
passwordRoutes.post('/reset', ResetPasswordController.create);

export default passwordRoutes;