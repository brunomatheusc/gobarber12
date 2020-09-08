import User from '../typeorm/entities/User';
import IUserRepository from '../repositories/IUserRepository';
import { injectable, inject } from 'tsyringe';
import IHashProvider from './../providers/HashProvider/models/IHashProvider';
import AppError from './../../../shared/errors/AppError';

interface Request {
	name: string;
	email: string;
	password: string;
}

@injectable()
export default class CreateUserService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUserRepository,

		@inject('HashProvider')
		private hashProvider: IHashProvider
	) {}

	public async execute({ name, email, password }: Request): Promise<User> {
		const checkUserExists = await this.usersRepository.findByEmail(email);

		if (checkUserExists){
			throw new AppError('E-mail address already used');
		}

		const hashedPassword = await this.hashProvider.generateHash(password);

		const user = await this.usersRepository.create({ name, email, password: hashedPassword });

		return user;
	}
}