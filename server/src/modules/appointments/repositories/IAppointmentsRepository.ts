import Appointment from "../typeorm/entities/Appointment";
import ICreateAppointmentDTO from "../dtos/ICreateAppointmentDTO";
import IFindAllInMonthByProviderDTO from "../dtos/IFindAllInMonthByProviderDTO";

export default interface IAppointmentsRepository {
	all(): Promise<Appointment[]>;	
	create(data: ICreateAppointmentDTO): Promise<Appointment>; 
	findByDate(date: Date): Promise<Appointment | undefined>;
	findAllInMonthByProvider(data: IFindAllInMonthByProviderDTO): Promise<Appointment[]>;
}