import { injectable, inject } from 'tsyringe';
import IUserRepository from '../repositories/IUserRepository';
import User from './../typeorm/entities/User';
import AppError from './../../../shared/errors/AppError';

interface IRequest {
	userId: string;
}

@injectable()
export default class ShowProfileService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUserRepository
	) {}
	
	public async execute({ userId }: IRequest): Promise<User> {
		const user = await this.usersRepository.findById(userId);

		if (!user) {
			throw new AppError('User not found');
		}
		
		return user;
	}
}