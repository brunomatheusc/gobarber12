import { getCustomRepository } from 'typeorm';

import UsersRepository from './../repositories/UsersRepository';
import User from '../typeorm/entities/User';

interface Request {
	userId: string;
	avatar: string;
}

export default class UpdateUserAvatarService {
	public async execute({ userId, avatar }: Request): Promise<User> {
		const usersRepositories = getCustomRepository(UsersRepository);

		const user = await usersRepositories.updateUserAvatar({ id: userId, avatar });

		return user;
	}
}