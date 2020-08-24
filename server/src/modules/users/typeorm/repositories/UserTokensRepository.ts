import { Repository, EntityRepository, getRepository  } from "typeorm";
import User from '../entities/User';

import IUserTokensRepository from './../../repositories/IUserTokensRepository';
import UserToken from './../entities/UserToken';

@EntityRepository(User)
export default class UserTokensRepository implements IUserTokensRepository {
	constructor(private ormRepository: Repository<UserToken>) {
		this.ormRepository = getRepository(UserToken);
	}

	public async generate(userId: string): Promise<UserToken> {
		const userToken = this.ormRepository.create({ user_id: userId });

		await this.ormRepository.save(userToken);

		return userToken;
	}

	public async findByToken(token: string): Promise<UserToken | undefined>{
		return await this.ormRepository.findOne({ where: { token }});
	}
}