import Appointment from '../models/Appointment';
import { EntityRepository, Repository } from 'typeorm';

interface CreateAppointmentsDTO {
	provider_id: string;
	date: Date;
}

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
	public async all(): Promise<Appointment[]> {
		return await this.find();
	} 

	public async createAppointment({ provider_id, date }: CreateAppointmentsDTO): Promise<Appointment> {
		const appointment = this.create({ provider_id, date });

		await this.save(appointment);
		
		return appointment;
	}

	public async findByDate(date: Date): Promise<Appointment | null> {
		const findAppointment = await this.findOne({ where: { date }});
	
		return findAppointment || null;
	}
}

export default AppointmentsRepository;