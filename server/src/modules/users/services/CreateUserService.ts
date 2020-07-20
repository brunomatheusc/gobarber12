import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../typeorm/entities/User';
import UsersRepository from './../repositories/UsersRepository';

interface Request {
	name: string;
	email: string;
	password: string;
}

export default class CreateUserService {
	public async execute({ name, email, password }: Request): Promise<User> {
		const usersRepository = getCustomRepository(UsersRepository);

		const checkUserExists = await usersRepository.findOne({ where: { email }});

		if (checkUserExists){
			throw new Error('E-mail address already used');
		}

		const hashedPassword = await hash(password, 8);

		const user = await usersRepository.createUser({ name, email, password: hashedPassword });

		return user;
	}
}