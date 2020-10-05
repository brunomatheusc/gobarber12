import { Response, Request } from 'express';
import { container } from 'tsyringe';
import AuthenticateUserService from './../services/AuthenticateUserService';
import { classToClass } from 'class-transformer';

class SesssionController {
	public async create(req: Request, res: Response) {
		try {
			const { email, password } = req.body;
			const authenticateUser = container.resolve(AuthenticateUserService);
	
			const { user, token } = await authenticateUser.execute({ email, password });
	
			return res.json({ user: classToClass(user), token });			
		} catch (error) {
			return res.status(400).json({ message: error.message });
		}
	}
}

export default new SesssionController;