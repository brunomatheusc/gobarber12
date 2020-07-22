import path from 'path';
import fs from 'fs';
import { Repository, EntityRepository, getRepository  } from "typeorm";
import User from '../entities/User';
import AppError from '../../../../shared/errors/AppError';

import uploadConfig from '../../../../config/upload';
import IUserRepository from 'modules/users/repositories/IUserRepository';

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
export default class UsersRepository implements IUserRepository {
	constructor(private ormRepository: Repository<User>) {
		this.ormRepository = getRepository(User);
	}

	public async findById(id: string): Promise<User | undefined> {
		return await this.ormRepository.findOne(id);
	}

	public async findByEmail(email: string): Promise<User | undefined>{
		return await this.ormRepository.findOne({ where: { email }});
	}

	public async create(userData: UserDTO): Promise<User> {
		const user = this.ormRepository.create(userData);

		await this.ormRepository.save(user);

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
		return await this.ormRepository.save(user);
	}
}