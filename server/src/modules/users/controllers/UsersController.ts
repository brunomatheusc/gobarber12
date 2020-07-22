import { Request, Response } from 'express';
import CreateUserService from './../services/CreateUserService';
import IUserRepository from '../repositories/IUserRepository';
import { container } from 'tsyringe';

class UsersController {
	private usersRepository: IUserRepository; 

	public async create(req: Request, res: Response) {
		try {
			const { name, email, password } = req.body;

			const createUser = container.resolve(CreateUserService);
			//const createUser = new CreateUserService(this.usersRepository);

			const user = await createUser.execute({ name, email, password });

			delete user.password;

			return res.json({ user });
		} catch (error) {
			return res.status(400).json({ message: error.message });			
		}
	}

	public read(req: Request, res: Response) {

	}
}

export default new UsersController;