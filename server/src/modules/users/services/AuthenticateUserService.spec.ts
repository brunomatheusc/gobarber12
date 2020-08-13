import "reflect-metadata";
import CreateUserService from './CreateUserService';
import FakeUsersRepository from './../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from './../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';

describe('AuthenticateUser', () => {
	it('should be able to authenticate user', async () => {
		const fakeUsersRepository = new FakeUsersRepository();
		const fakeHashProvider = new FakeHashProvider();
		const authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);
		const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);

		await createUser.execute({
			name: 'John Doe',
			email: 'johndoe@example.com',
			password: '123456'
		});

		const response = await authenticateUser.execute({
			email: 'johndoe@example.com',
			password: '123456'
		});

		expect(response).toHaveProperty('token');
	});

	it('should not be able to authenticate user with wrong password', async () => {
		const fakeUsersRepository = new FakeUsersRepository();
		const fakeHashProvider = new FakeHashProvider();
		const authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);
		const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);

		await createUser.execute({
			name: 'John Doe',
			email: 'johndoe@example.com',
			password: '123456'
		});

		expect(authenticateUser.execute({
			email: 'johndoe@example.com',
			password: 'wrong-password'
		})).rejects.toBeInstanceOf(Error);
	});

	it('should not be able to authenticate with non existing user', async () => {
		const fakeUsersRepository = new FakeUsersRepository();
		const fakeHashProvider = new FakeHashProvider();

		const authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);

		expect(authenticateUser.execute({
			email: 'johndoe@example.com',
			password: '123456'
		})).rejects.toBeInstanceOf(Error);
	});
});