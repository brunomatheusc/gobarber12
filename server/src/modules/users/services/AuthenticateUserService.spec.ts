import "reflect-metadata";
import CreateUserService from './CreateUserService';
import FakeUsersRepository from './../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from './../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import AppError from './../../../shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserService;
let createUser: CreateUserService;

describe('AuthenticateUser', () => {
	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository();
		fakeHashProvider = new FakeHashProvider();
		authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);
		createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
	});

	it('should be able to authenticate user', async () => {
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
		expect(authenticateUser.execute({
			email: 'johndoe@example.com',
			password: '123456'
		})).rejects.toBeInstanceOf(Error);
	});
});
