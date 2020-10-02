import { startOfHour, addHours } from 'date-fns';
import Appointment from '../typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
	provider_id: string;
	user_id: string;
	date: Date;
}

@injectable()
class CreateAppointmentService {
	constructor(
		@inject('AppointmentsRepository')
		private appointmentsRepository: IAppointmentsRepository
	) {}

	public async execute({ provider_id, user_id, date }: IRequest): Promise<Appointment> {
		const appointmentDate = startOfHour(addHours(date, 2)); 

		const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(appointmentDate);
	
		if (findAppointmentInSameDate) {
			throw Error('This appointment is already booked');
		}
	
		const appointment = await this.appointmentsRepository.create({ provider_id, user_id, date: appointmentDate });
		
		return appointment;
	}
}

export default CreateAppointmentService;