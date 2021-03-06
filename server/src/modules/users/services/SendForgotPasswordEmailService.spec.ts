import "reflect-metadata";
import FakeUsersRepository from './../repositories/fakes/FakeUsersRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import FakeMailProvider from './../../../shared/container/providers/MailProvider/fakes/FakeMailProvider';
import AppError from './../../../shared/errors/AppError';
import FakeUserTokensRepository from './../repositories/fakes/FakeUserTokensRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPassword: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository();
		fakeMailProvider = new FakeMailProvider();
		fakeUserTokensRepository = new FakeUserTokensRepository();
		
		sendForgotPassword = new SendForgotPasswordEmailService(fakeUsersRepository, fakeMailProvider, fakeUserTokensRepository);
	});

	it('should be able to recover the password using e-mail', async () => {
		const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

		await fakeUsersRepository.create({
			name: 'John Doe',
			email: 'johndoe@example.com',
			password: '123456'
		});

		await sendForgotPassword.execute({ email: 'johndoe@example.com' });

		expect(sendMail).toHaveBeenCalled();
	});

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
});
