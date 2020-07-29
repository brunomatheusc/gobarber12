import { uuid } from 'uuidv4';
import { EntityRepository, Repository, getRepository } from 'typeorm';
import IAppointmentsRepository from 'modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from 'modules/appointments/dtos/ICreateAppointmentDTO';
import Appointment from './../../typeorm/entities/Appointment';
import { isEqual } from 'date-fns';

@EntityRepository(Appointment)
class FakeAppointmentsRepository implements IAppointmentsRepository {
	private appointments: Appointment[] = [];

	public async all(): Promise<Appointment[]> {
		return this.appointments;
	} 

	public async create({ provider_id, date }: ICreateAppointmentDTO): Promise<Appointment> {
		const appointment = new Appointment();

		Object.assign(appointment, { id: uuid, date, provider_id });

		this.appointments.push(appointment);

		return appointment;
	}

	public async findByDate(date: Date): Promise<Appointment | undefined> {
		const findAppointment = this.appointments.find(appointment => isEqual(appointment.date, date));

		return findAppointment;
	}
}

export default FakeAppointmentsRepository;