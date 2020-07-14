import { Response, Request } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';

class SesssionController {
	public async create(req: Request, res: Response) {
		const { email, password } = req.body;
		const authenticateUser = new AuthenticateUserService();

		const { user, token } = await authenticateUser.execute({ email, password });

		delete user.password;

		return res.json({ user, token });
	}
}

export default new SesssionController;