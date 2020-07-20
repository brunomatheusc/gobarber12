import Appointment from "../typeorm/entities/Appointment";
import ICreateAppointmentDTO from "../dtos/ICreateAppointmentDTO";

export default interface IAppointmentsRepository {
	all(): Promise<Appointment[]>;	
	create(data: ICreateAppointmentDTO): Promise<Appointment>; 
	findByDate(date: Date): Promise<Appointment | undefined>;
}