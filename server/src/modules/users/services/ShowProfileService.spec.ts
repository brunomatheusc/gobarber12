import "reflect-metadata";
import FakeUsersRepository from './../repositories/fakes/FakeUsersRepository';
import AppError from './../../../shared/errors/AppError';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('ShowProfile', () => {
	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository();
		showProfile = new ShowProfileService(fakeUsersRepository);		
	});

	it('should be able to show profile', async () => {
		const user = await fakeUsersRepository.create({
			name: 'John Doe',
			email: 'johndoe@example.com',
			password: '123456'
		});

		const profile = await showProfile.execute({ userId: user.id });

		expect(profile.name).toBe('John Doe');
		expect(profile.email).toBe('johndoe@example.com');
	});

	it('should not be able to show profile from non-existing user', async () => {
		expect(showProfile.execute({ userId: 'non-existing-user' })).rejects.toBeInstanceOf(AppError);
	});
});