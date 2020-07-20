import path from 'path';
import fs from 'fs';
import { Repository, EntityRepository  } from "typeorm";
import User from '../entities/User';
import AppError from '../../../../shared/errors/AppError';

import uploadConfig from '../../../../config/upload';

interface UserDTO {
	name: string;
	email: string;
	password: string;
}

interface AvatarDTO {
	id: string;
	avatar: string;
}

@EntityRepository(User)
export default class UsersRepository extends Repository<User> {
	public async getById(id: string): Promise<User | undefined> {
		return await this.findOne({ where: { id }});
	}

	public async createUser({ name, email, password }: UserDTO): Promise<User> {
		const user = this.create({ name, email, password });

		await this.save(user);

		return user;
	}

	public async updateUserAvatar({ id, avatar }: AvatarDTO): Promise<User> {
		const user = await this.findOne(id);

		if (!user) {
			throw new AppError('Only authenticade users can change avatar.', 401);
		}

		if (user.avatar) {
			const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
			const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath); 

			if (userAvatarFileExists) {
				await fs.promises.unlink(userAvatarFilePath);
			}
		}

		user.avatar = avatar;

		await this.save(user);

		return user;
	}
}