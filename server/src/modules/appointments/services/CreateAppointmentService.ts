import { startOfHour, addHours } from 'date-fns';
import Appointment from '../typeorm/entities/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import { getCustomRepository } from 'typeorm';

interface Request {
	provider_id: string;
	date: Date;
}

class CreateAppointmentService {
	public async execute({ provider_id, date }: Request): Promise<Appointment> {
		const appointmentsRepository = getCustomRepository(AppointmentsRepository);

		// const appointmentDate = startOfHour(date);
		const appointmentDate = startOfHour(addHours(date, 2)); 

		const findAppointmentInSameDate = await appointmentsRepository.findByDate(appointmentDate);
	
		if (findAppointmentInSameDate) {
			throw Error('This appointment is already booked');
		}
	
		const appointment = await appointmentsRepository.createAppointment({ provider_id, date: appointmentDate });
		
		return appointment;
	}
}

export default CreateAppointmentService;