import "reflect-metadata";
import FakeUsersRepository from './../repositories/fakes/FakeUsersRepository';
import AppError from './../../../shared/errors/AppError';
import FakeUserTokensRepository from './../repositories/fakes/FakeUserTokensRepository';
import ResetPasswordService from "./ResetPasswordService";

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let resetPassword: ResetPasswordService;

describe('ResetPassword', () => {
	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository();
		fakeUserTokensRepository = new FakeUserTokensRepository();
		
		resetPassword = new ResetPasswordService(fakeUsersRepository, fakeUserTokensRepository);
	});

	it('should be able to reset the password', async () => {
		const user = await fakeUsersRepository.create({
			name: 'John Doe',
			email: 'johndoe@example.com',
			password: '123456'
		});

		const { token } = await fakeUserTokensRepository.generate(user.id);

		await resetPassword.execute({ token, password: '123123' });

		const updatedUser = await fakeUsersRepository.findById(user.id);

		expect(updatedUser?.password).toBe('123123');
	});


	/*
	it('should not be able to recover a non-existing user password', async () => {
		await expect(sendForgotPassword.execute({ email: 'johndoe@example.com' })).rejects.toBeInstanceOf(AppError);
	});

	it('should generate a forget password token', async () => {
		const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

		const user = await fakeUsersRepository.create({
			name: 'John Doe',
			email: 'johndoe@example.com',
			password: '123456'
		});

		await sendForgotPassword.execute({ email: 'johndoe@example.com' });

		expect(generateToken).toHaveBeenCalledWith(user.id);
	});

	*/
});
