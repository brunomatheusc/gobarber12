import { injectable, inject } from 'tsyringe';
import Appointment from '../typeorm/entities/Appointment';
import IAppointmentsRepository from './../repositories/IAppointmentsRepository';

interface IRequest {
	providerId: string;
	day: number;
	month: number;
	year: number;
}

@injectable()
export default class ListProviderAppointmentsService {
	constructor(
		@inject('AppointmentsRepository')
		private appointmentsRepository: IAppointmentsRepository
	) {}
	
	public async execute({ providerId, year, month, day }: IRequest): Promise<Appointment[]> {
		const appointments = await this.appointmentsRepository.findAllInDayByProvider({ day, month, year, providerId });

		return appointments;
	}
}