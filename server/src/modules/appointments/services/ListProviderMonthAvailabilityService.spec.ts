import "reflect-metadata";
import AppError from './../../../shared/errors/AppError';
import FakeUsersRepository from '../../users/repositories/fakes/FakeUsersRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';
import FakeAppointmentsRepository from './../repositories/fakes/FakeAppointmentsRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailability: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailability', () => {
	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository();
		fakeAppointmentsRepository = new FakeAppointmentsRepository();
		listProviderMonthAvailability = new ListProviderMonthAvailabilityService(fakeAppointmentsRepository, fakeUsersRepository);		
	});

	it('should be able to list the month availability from provider', async () => {
		for (let i = 8; i <= 17; i++) {
			await fakeAppointmentsRepository.create({
				provider_id: 'user',
				date: new Date(2020, 4, 20, i, 0, 0),
			});
		}

		await fakeAppointmentsRepository.create({
			provider_id: 'user',
			date: new Date(2020, 4, 21, 8, 0, 0),
		});

		const availability = await listProviderMonthAvailability.execute({ providerId: 'user', year: 2020, month: 5 });

		await expect(availability).toEqual(expect.arrayContaining([
			{ day: 19, available: true },
			{ day: 20, available: false },
			{ day: 21, available: true },
			{ day: 22, available: true },
		]));
	});
});