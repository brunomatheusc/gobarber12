import Appointment from '../entities/Appointment';
import { EntityRepository, Repository, getRepository } from 'typeorm';
import IAppointmentsRepository from 'modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from 'modules/appointments/dtos/ICreateAppointmentDTO';

@EntityRepository(Appointment)
class AppointmentsRepository implements IAppointmentsRepository {
	constructor(private ormRepository: Repository<Appointment>) {
		this.ormRepository = getRepository(Appointment);
	}

	public async all(): Promise<Appointment[]> {
		return await this.ormRepository.find();
	} 

	public async create({ provider_id, date }: ICreateAppointmentDTO): Promise<Appointment> {
		const appointment = this.ormRepository.create({ provider_id, date });

		await this.ormRepository.save(appointment);
		
		return appointment;
	}

	public async findByDate(date: Date): Promise<Appointment | undefined> {
		const findAppointment = await this.ormRepository.findOne({ where: { date }});
	
		return findAppointment || undefined;
	}
}

export default AppointmentsRepository;