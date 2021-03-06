import "reflect-metadata";
import AppError from './../../../shared/errors/AppError';
import FakeUsersRepository from '../../users/repositories/fakes/FakeUsersRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';
import FakeAppointmentsRepository from './../repositories/fakes/FakeAppointmentsRepository';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderAppointments: ListProviderAppointmentsService;

describe('ListProviderAppointments', () => {
	beforeEach(() => {
		fakeAppointmentsRepository = new FakeAppointmentsRepository();
		listProviderAppointments = new ListProviderAppointmentsService(fakeAppointmentsRepository);		
	});

	it('should be able to list appointments on a specific day', async () => {
		const appointment1 =  await fakeAppointmentsRepository.create({
			provider_id: 'provider',
			user_id: 'user',
			date: new Date(2020, 4, 20, 14, 0, 0),
		});

		const appointment2 =  await fakeAppointmentsRepository.create({
			provider_id: 'provider',
			user_id: 'user',
			date: new Date(2020, 4, 20, 15, 0, 0),
		});

		const appointments = await listProviderAppointments.execute({ providerId: 'provider', year: 2020, month: 5, day: 20 });

		expect(appointments).toEqual([appointment1, appointment2]);
	});
});