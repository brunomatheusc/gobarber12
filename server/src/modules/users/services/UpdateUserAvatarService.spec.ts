import "reflect-metadata";
import FakeUsersRepository from './../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from './../providers/HashProvider/fakes/FakeHashProvider';
import UpdateUserAvatarService from './UpdateUserAvatarService';
import FakeStorageProvider from './../../../shared/container/providers/StorageProviders/fakes/FakeStorageProvider';
import AppError from './../../../shared/errors/AppError';

describe('UpdateUserAvatar', () => {
	it('should be able to update user avatar', async () => {
		const fakeUsersRepository = new FakeUsersRepository();
		const fakeStorageProvider = new FakeStorageProvider(); 
		const updateUserAvatar = new UpdateUserAvatarService(fakeUsersRepository, fakeStorageProvider);

		const user = await fakeUsersRepository.create({
			name: 'John Doe',
			email: 'johndoe@example.com',
			password: '123456'
		});

		await updateUserAvatar.execute({
			userId: user.id,
			avatar: 'avatar.jpg'
		});

		expect(user.avatar).toBe('avatar.jpg');
	});

	it('should not be able to update avatar from non existing user', async () => {
		const fakeUsersRepository = new FakeUsersRepository();
		const fakeStorageProvider = new FakeStorageProvider(); 
		const updateUserAvatar = new UpdateUserAvatarService(fakeUsersRepository, fakeStorageProvider);

		expect(updateUserAvatar.execute({
			userId: 'non-existing',
			avatar: 'avatar.jpg'
		})).rejects.toBeInstanceOf(AppError);
	});

	it('should delete old avatar when updating new one', async () => {
		const fakeUsersRepository = new FakeUsersRepository();
		const fakeStorageProvider = new FakeStorageProvider(); 
		const updateUserAvatar = new UpdateUserAvatarService(fakeUsersRepository, fakeStorageProvider);

		const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

		const user = await fakeUsersRepository.create({
			name: 'John Doe',
			email: 'johndoe@example.com',
			password: '123456'
		});

		await updateUserAvatar.execute({
			userId: user.id,
			avatar: 'avatar.jpg'
		});

		await updateUserAvatar.execute({
			userId: user.id,
			avatar: 'avatar2.jpg'
		});

		expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
		expect(user.avatar).toBe('avatar2.jpg');
	});

});
