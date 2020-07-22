import { hash } from 'bcryptjs';

import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import IUserRepository from '../repositories/IUserRepository';
import { injectable, inject } from 'tsyringe';

interface Request {
	name: string;
	email: string;
	password: string;
}

@injectable()
export default class CreateUserService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUserRepository
	) {}

	public async execute({ name, email, password }: Request): Promise<User> {
		const checkUserExists = await this.usersRepository.findByEmail(email);

		if (checkUserExists){
			throw new Error('E-mail address already used');
		}

		const hashedPassword = await hash(password, 8);

		const user = await this.usersRepository.create({ name, email, password: hashedPassword });

		return user;
	}
}