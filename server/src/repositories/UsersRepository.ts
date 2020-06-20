import { Repository, EntityRepository  } from "typeorm";
import User from './../models/User';

interface UserDTO {
	name: string;
	email: string;
	password: string;
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
}