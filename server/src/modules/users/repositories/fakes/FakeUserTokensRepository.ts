import User from './../../typeorm/entities/User';
import IUserTokensRepository from './../IUserTokensRepository';
import UserToken from './../../typeorm/entities/UserToken';
import { uuid } from 'uuidv4';

export default class FakeUserTokensRepository implements IUserTokensRepository {
	private userTokens: UserToken[] = [];
	
	public async generate(user_id: string): Promise<UserToken> {
		const userToken = new UserToken();

		Object.assign(userToken, { id: uuid(), token: uuid(), user_id });

		this.userTokens.push(userToken);

		return userToken;
	}

	public async findByToken(token: string): Promise<UserToken | undefined> {
		const user = this.userTokens.find(user => user.token == token);

		return user;
	}
}