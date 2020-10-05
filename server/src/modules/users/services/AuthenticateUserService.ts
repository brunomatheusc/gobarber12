import { sign } from "jsonwebtoken";

import { injectable, inject } from "tsyringe";
import User from '../typeorm/entities/User';
import authConfig from '../../../config/auth';
import IUserRepository from "../repositories/IUserRepository";
import IHashProvider from './../providers/HashProvider/models/IHashProvider';

interface Request {
	email: string;
	password: string;
}

interface Response {
	user: User;
	token: string;
}

@injectable()
export default class AuthenticateUserService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUserRepository,

		@inject('HashProvider')
		private hashProvider: IHashProvider
	) {}

	public async execute({ email, password}: Request): Promise<Response> {
		const user = await this.usersRepository.findByEmail(email);

		if (!user) {
			throw new Error('Incorrect e-mail/password combination');
		}

		const passwordMatched = await this.hashProvider.compareHash(password, user.password || '');

		if (!passwordMatched) {
			throw new Error('Incorrect e-mail/password combination');
		}

		const { jwt: { secret, expiresIn } } = authConfig;

		const token = sign({ }, secret, {
			subject: user.id,
			expiresIn
		});

		return { user, token };
	}
}