import { injectable, inject } from 'tsyringe';
import User from '../typeorm/entities/User';
import IUserRepository from '../repositories/IUserRepository';
import IStorageProvider from './../../../shared/container/providers/StorageProviders/models/IStorageProvider';
import AppError from './../../../shared/errors/AppError';

interface Request {
	userId: string;
	avatar: string;
}

@injectable()
export default class UpdateUserAvatarService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUserRepository,

		@inject('StorageProvider')
		private storageProvider: IStorageProvider
	) {}
	
	public async execute({ userId, avatar }: Request): Promise<User> {
		const user = await this.usersRepository.findById(userId);

		if (!user) {
			throw new AppError('Only authenticade users can change avatar.', 401);
		}

		if (user.avatar) {
			await this.storageProvider.deleteFile(user.avatar);
		}

		const filename = await this.storageProvider.saveFile(avatar);

		user.avatar = filename;

		await this.usersRepository.save(user);

		return user;
	}
}