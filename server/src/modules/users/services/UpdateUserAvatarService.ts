import UsersRepository from '../typeorm/repositories/UsersRepository';
import User from '../typeorm/entities/User';
import IUserRepository from '../repositories/IUserRepository';

interface Request {
	userId: string;
	avatar: string;
}

export default class UpdateUserAvatarService {
	constructor(private usersRepository: IUserRepository) {}
	
	public async execute({ userId, avatar }: Request): Promise<User> {
		const user = await this.usersRepository.updateUserAvatar({ id: userId, avatar });

		return user;
	}
}