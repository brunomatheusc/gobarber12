import { Router } from 'express';

import ProfileController from '../../controllers/ProfileController';
import ensureAuthenticated from './../middlewares/ensureAuthenticated';

const profileRoutes = Router();

profileRoutes.use(ensureAuthenticated);

profileRoutes.put('/', ProfileController.update);

export default profileRoutes;