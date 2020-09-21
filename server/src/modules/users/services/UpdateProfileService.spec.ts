import "reflect-metadata";
import FakeUsersRepository from './../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';
import AppError from './../../../shared/errors/AppError';
import FakeHashProvider from './../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository();
		fakeHashProvider = new FakeHashProvider(); 
		updateProfile = new UpdateProfileService(fakeUsersRepository, fakeHashProvider);		
	});

	it('should be able to update profile', async () => {
		const user = await fakeUsersRepository.create({
			name: 'John Doe',
			email: 'johndoe@example.com',
			password: '123456'
		});

		const udpatedUser = await updateProfile.execute({
			userId: user.id,
			name: 'John Three',
			email: 'johnthree@example.com'
		});

		expect(udpatedUser.name).toBe('John Three');
		expect(udpatedUser.email).toBe('johnthree@example.com');
	});

	it('should be not able to change e-mail to another user e-mail', async () => {
		await fakeUsersRepository.create({
			name: 'John Doe',
			email: 'johndoe@example.com',
			password: '123456'
		});

		const user = await fakeUsersRepository.create({
			name: 'John Three',
			email: 'johnthree@example.com',
			password: '123456'
		});

		await expect(updateProfile.execute({
			userId: user.id,
			name: 'John Three',
			email: 'johndoe@example.com'
		})).rejects.toBeInstanceOf(AppError);
	});

	it('should be able to update password', async () => {
		const user = await fakeUsersRepository.create({
			name: 'John Doe',
			email: 'johndoe@example.com',
			password: '123456'
		});

		const updatedUser = await updateProfile.execute({
			userId: user.id,			
			name: 'John Three',
			email: 'johnthree@example.com',
			oldPassword: '123456',
			password: '123123'
		});

		await expect(updatedUser.password).toBe('123123');
	});

	it('should not be able to update password without old password', async () => {
		const user = await fakeUsersRepository.create({
			name: 'John Doe',
			email: 'johndoe@example.com',
			password: '123456'
		});

		await expect(updateProfile.execute({
			userId: user.id,			
			name: 'John Three',
			email: 'johnthree@example.com',
			password: '123123'
		})).rejects.toBeInstanceOf(AppError);
	});

	it('should not be able to update password with wrong password', async () => {
		const user = await fakeUsersRepository.create({
			name: 'John Doe',
			email: 'johndoe@example.com',
			password: '123456'
		});

		await expect(updateProfile.execute({
			userId: user.id,			
			name: 'John Three',
			email: 'johnthree@example.com',
			password: '123123',
			oldPassword: 'wrongOldPassword'
		})).rejects.toBeInstanceOf(AppError);
	});

	it('should not be able to update profile from non-existing user', async () => {
		await expect(updateProfile.execute({ 
			userId: 'non-existing-user', 
			name: 'John Doe',
			email: 'johndoe@example.com',
			password: '123456'
		})).rejects.toBeInstanceOf(AppError);
	});
});