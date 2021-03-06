import Appointment from '../entities/Appointment';
import { EntityRepository, Repository, getRepository, Raw } from 'typeorm';
import IAppointmentsRepository from './../../repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from './../../dtos/ICreateAppointmentDTO';
import IFindAllInMonthByProviderDTO from './../../dtos/IFindAllInMonthByProviderDTO';
import IFindAllInDayByProviderDTO from './../../dtos/IFindAllInDayByProviderDTO';

@EntityRepository(Appointment)
class AppointmentsRepository implements IAppointmentsRepository {
	private ormRepository: Repository<Appointment>;
	
	constructor() {
		this.ormRepository = getRepository(Appointment);
	}

	public async all(): Promise<Appointment[]> {
		return await this.ormRepository.find();
	} 

	public async create({ provider_id, user_id, date }: ICreateAppointmentDTO): Promise<Appointment> {
		const appointment = this.ormRepository.create({ provider_id, user_id, date });

		await this.ormRepository.save(appointment);
		
		return appointment;
	}

	public async findByDate(date: Date): Promise<Appointment | undefined> {
		const findAppointment = await this.ormRepository.findOne({ where: { date }});
	
		return findAppointment || undefined;
	}

	public async findAllInMonthByProvider({ providerId, month, year }: IFindAllInMonthByProviderDTO): Promise<Appointment[]> {
		const parsedMonth = String(month).padStart(2, '0');

		const appointments = await this.ormRepository.find({
			where: {
				provider_id: providerId,
				date: Raw(dateFieldName => `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`)
			}
		});

		return appointments;
	}

	public async findAllInDayByProvider({ providerId, month, year, day }: IFindAllInDayByProviderDTO): Promise<Appointment[]> {
		const parsedMonth = String(month).padStart(2, '0');
		const parsedDay = String(day).padStart(2, '0');

		const appointments = await this.ormRepository.find({
			where: {
				provider_id: providerId,
				date: Raw(dateFieldName => `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`)
			}
		});

		return appointments;
	}
}

export default AppointmentsRepository;