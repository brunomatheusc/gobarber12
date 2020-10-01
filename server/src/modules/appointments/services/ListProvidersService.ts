import { injectable, inject } from 'tsyringe';
import IUserRepository from './../../users/repositories/IUserRepository';
import User from './../../users/typeorm/entities/User';

interface IRequest {
	userId: string;
}

@injectable()
export default class ListProvidersService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUserRepository
	) {}
	
	public async execute({ userId }: IRequest): Promise<User[]> {
		const users = await this.usersRepository.findAllProviders({ exceptId: userId });
		
		return users;
	}
}