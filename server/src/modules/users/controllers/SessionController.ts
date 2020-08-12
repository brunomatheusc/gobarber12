import { Response, Request } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';
import IUserRepository from '../repositories/IUserRepository';
import IHashProvider from './../providers/HashProvider/models/IHashProvider';

class SesssionController {
	private usersRepository: IUserRepository; 
	private hashProvider: IHashProvider;

	public async create(req: Request, res: Response) {
		const { email, password } = req.body;
		const authenticateUser = new AuthenticateUserService(this.usersRepository, this.hashProvider);

		const { user, token } = await authenticateUser.execute({ email, password });

		delete user.password;

		return res.json({ user, token });
	}
}

export default new SesssionController;