import path from 'path';
import fs from 'fs';
import AppError from '../../../../shared/errors/AppError';

import uploadConfig from '../../../../config/upload';
import IUserRepository from './../IUserRepository';
import User from './../../typeorm/entities/User';
import { uuid } from 'uuidv4';

interface UserDTO {
	name: string;
	email: string;
	password: string;
}

interface AvatarDTO {
	id: string;
	avatar: string;
}

export default class UsersRepository implements IUserRepository {
	private users: User[] = [];
	
	public async findById(id: string): Promise<User | undefined> {
		return this.users.find(user => user.id == id);
	}
	
	public async findByEmail(email: string): Promise<User | undefined>{
		return this.users.find(user => user.email == email);
	}

	public async create(userData: UserDTO): Promise<User> {
		const user = new User();

		Object.assign(user, { id: uuid() }, userData);

		this.users.push(user);

		return user;
	}

	public async updateUserAvatar({ id, avatar }: AvatarDTO): Promise<User> {
		const user = await this.findById(id);

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

	public async save(user: User): Promise<User> {
		const findIndex = this.users.findIndex(findUser => findUser.id == user.id);

		this.users[findIndex] = user;

		return user;
	}
}