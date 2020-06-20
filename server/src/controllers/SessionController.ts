import { Response, Request } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';

class SesssionController {
	public async create(req: Request, res: Response) {
		try {
			const { email, password } = req.body;
			const authenticateUser = new AuthenticateUserService();

			const { user, token } = await authenticateUser.execute({ email, password });

			delete user.password;

			return res.json({ user, token });
		} catch (error) {
			
		}
	}
}

export default new SesssionController;