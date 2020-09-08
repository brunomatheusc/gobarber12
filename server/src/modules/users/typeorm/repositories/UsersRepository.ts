import { Repository, getRepository  } from "typeorm";
import User from '../entities/User';

import IUserRepository from 'modules/users/repositories/IUserRepository';

interface UserDTO {
	name: string;
	email: string;
	password: string;
}

export default class UsersRepository implements IUserRepository {
	private ormRepository: Repository<User>;
	
	constructor() {
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

	public async save(user: User): Promise<User> {
		return await this.ormRepository.save(user);
	}
}