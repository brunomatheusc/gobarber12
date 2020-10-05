import "reflect-metadata";
import CreateAppointmentService from './CreateAppointmentService';
import FakeAppointmentsRepository from './../repositories/fakes/FakeAppointmentsRepository';
import AppError from './../../../shared/errors/AppError';
import FakeNotificationsRepository from './../../notifications/repositories/fakes/FakeNotificationsRepository';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeNotificationsRepository: FakeNotificationsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
	beforeEach(() => {
		fakeAppointmentsRepository = new FakeAppointmentsRepository();
		fakeNotificationsRepository = new FakeNotificationsRepository();
		createAppointment = new CreateAppointmentService(fakeAppointmentsRepository, fakeNotificationsRepository);
	});

	it('should be able to create a new appointment', async () => {
		jest.spyOn(Date, 'now').mockImplementationOnce(() => {
			return new Date(2020, 4, 10, 12).getTime();
		});

		const appointment = await createAppointment.execute({
			date: new Date(2020, 4, 10, 13),
			user_id: 'userId',
			provider_id: 'providerId'
		});

		expect(appointment).toHaveProperty('id');
		expect(appointment.provider_id).toBe('providerId');
	});

	it('should not be able to create two appointments on the same time', async () => {
		jest.spyOn(Date, 'now').mockImplementationOnce(() => {
			return new Date(2020, 4, 10, 8).getTime();
		});

		const appointmentDate = new Date(2020, 4, 10, 11);

		await createAppointment.execute({
			date: appointmentDate,
			user_id: 'userId',
			provider_id: 'providerId'
		});

		expect(createAppointment.execute({
			date: appointmentDate,
			user_id: 'userId',
			provider_id: 'providerId'
		})).rejects.toBeInstanceOf(AppError);
	});


	it('should not be able to create an appointment on past date', async () => {
		jest.spyOn(Date, 'now').mockImplementationOnce(() => {
			return new Date(2020, 4, 10, 12).getTime();
		});

		expect(createAppointment.execute({
			date: new Date(2020, 4, 10, 11),
			user_id: 'userId',
			provider_id: 'providerId'
		})).rejects.toBeInstanceOf(AppError);
	});

	it('should not be able to create an appointment with same user as provider', async () => {
		jest.spyOn(Date, 'now').mockImplementationOnce(() => {
			return new Date(2020, 4, 10, 12).getTime();
		});

		expect(createAppointment.execute({
			date: new Date(2020, 4, 10, 11),
			user_id: 'userId',
			provider_id: 'userId'
		})).rejects.toBeInstanceOf(AppError);
	});

	it('should not be able to create an appointment before 8am and after 5pm', async () => {
		jest.spyOn(Date, 'now').mockImplementationOnce(() => {
			return new Date(2020, 4, 10, 12).getTime();
		});

		expect(createAppointment.execute({
			date: new Date(2020, 4, 10, 7),
			user_id: 'userId',
			provider_id: 'providerId'
		})).rejects.toBeInstanceOf(AppError);

		expect(createAppointment.execute({
			date: new Date(2020, 4, 10, 18),
			user_id: 'userId',
			provider_id: 'providerId'
		})).rejects.toBeInstanceOf(AppError);
	});
});
