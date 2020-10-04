import { startOfHour, addHours, isBefore, getHours } from 'date-fns';
import Appointment from '../typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import { inject, injectable } from 'tsyringe';
import AppError from './../../../shared/errors/AppError';

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
		const appointmentDate = startOfHour(date); 
		// const appointmentDate = startOfHour(addHours(date, 2)); 

		if (isBefore(appointmentDate, Date.now())) {
			throw new AppError("You can't create an appointment on a past date");
		}

		if (user_id === provider_id) {
			throw new AppError("You can't create an appointment with yourself");
		}

		if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
			throw new AppError("You can only create appointments between 8am and 5pm");
		}

		const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(appointmentDate);
	
		if (findAppointmentInSameDate) {
			throw new AppError('This appointment is already booked');
		}
	
		const appointment = await this.appointmentsRepository.create({ provider_id, user_id, date: appointmentDate });
		
		return appointment;
	}
}

export default CreateAppointmentService;