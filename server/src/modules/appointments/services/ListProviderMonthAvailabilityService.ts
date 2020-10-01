import { getDate, getDaysInMonth } from 'date-fns';
import { injectable, inject } from 'tsyringe';
import IUserRepository from './../../users/repositories/IUserRepository';
import User from './../../users/typeorm/entities/User';
import IAppointmentsRepository from './../repositories/IAppointmentsRepository';

interface IRequest {
	providerId: string;
	month: number;
	year: number;
}

type IResponse = Array<{
	day: number;
	available: boolean;
}>

@injectable()
export default class ListProviderMonthAvailabilityService {
	constructor(
		@inject('AppointmentsRepository')
		private appointmentsRepository: IAppointmentsRepository,

		@inject('UsersRepository')
		private usersRepository: IUserRepository
	) {}
	
	public async execute({ providerId, year, month }: IRequest): Promise<IResponse> {
		const appointments = await this.appointmentsRepository.findAllInMonthByProvider({ providerId, year, month });

		const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1));

		const eachDayArray = Array.from({ length: numberOfDaysInMonth }, (_, index) => index + 1);

		const availability = eachDayArray.map(day => {
			const appointmentsInDay = appointments.filter(appointment => getDate(appointment.date) == day);

			return { day, available: !!(appointmentsInDay.length < 10) };
		});

		return availability;
	}
}