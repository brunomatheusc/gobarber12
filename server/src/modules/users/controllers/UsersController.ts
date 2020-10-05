import { Request, Response } from 'express';
import CreateUserService from './../services/CreateUserService';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

class UsersController {
	public async create(req: Request, res: Response) {
		try {
			const { name, email, password } = req.body;

			const createUser = container.resolve(CreateUserService);

			const user = await createUser.execute({ name, email, password });

			return res.json({ user: classToClass(user) });
		} catch (error) {
			return res.status(400).json({ message: error.message });			
		}
	}

	public read(req: Request, res: Response) {

	}
}

export default new UsersController;