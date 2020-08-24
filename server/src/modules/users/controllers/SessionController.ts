import { Response, Request } from 'express';
import { container } from 'tsyringe';
import AuthenticateUserService from './../services/AuthenticateUserService';

class SesssionController {
	public async create(req: Request, res: Response) {
		const { email, password } = req.body;
		const authenticateUser = container.resolve(AuthenticateUserService);

		const { user, token } = await authenticateUser.execute({ email, password });

		delete user.password;

		return res.json({ user, token });
	}
}

export default new SesssionController;