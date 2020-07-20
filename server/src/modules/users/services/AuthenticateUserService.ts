import { getRepository } from "typeorm";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import User from '../typeorm/entities/User';
import authConfig from '../../../config/auth';

interface Request {
	email: string;
	password: string;
}

interface Response {
	user: User;
	token: string;
}

export default class AuthenticateUserService {
	public async execute({ email, password}: Request): Promise<Response> {
		const usersRepository = getRepository(User);

		const user = await usersRepository.findOne({ where: { email }});

		if (!user) {
			throw new Error('Incorrect e-mail/password combination');
		}

		const passwordMatched = await compare(password, user.password);

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