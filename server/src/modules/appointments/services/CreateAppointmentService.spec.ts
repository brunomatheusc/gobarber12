import "reflect-metadata";
import CreateAppointmentService from './CreateAppointmentService';
import FakeAppointmentsRepository from './../repositories/fakes/FakeAppointmentsRepository';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
	beforeEach(() => {
		fakeAppointmentsRepository = new FakeAppointmentsRepository();
		createAppointment = new CreateAppointmentService(fakeAppointmentsRepository);
	});

	it('should be able to create a new appointment', async () => {
		const appointment = await createAppointment.execute({
			date: new Date(),
			provider_id: '123'
		});

		expect(appointment).toHaveProperty('id');
	});

	it('should not be able to create two appointments on the same date time', async () => {
		const appointmentDate = new Date();

		await createAppointment.execute({
			date: appointmentDate,
			provider_id: '123'
		});

		expect(createAppointment.execute({
			date: appointmentDate,
			provider_id: '123'
		})).rejects.toBeInstanceOf(Error);
	});
});
