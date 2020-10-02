import { Response, Request } from 'express';
import CreateAppointmentService from '../services/CreateAppointmentService';
import { parseISO } from 'date-fns';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import { container } from 'tsyringe';

class AppointmentsController {
	private appointmentsRepository: IAppointmentsRepository;

	public async create(req: Request, res: Response) {		
		const user_id = req.user.id;

		const { provider_id, date } = req.body;
		const parsedDate = parseISO(date);
	
		const create = container.resolve(CreateAppointmentService);
		const appointment = await create.execute({ provider_id, user_id, date: parsedDate });
	
		return res.json(appointment);		
	}

	public async read(req: Request, res: Response) {
		return res.json(await this.appointmentsRepository.all());
	}
}

export default new AppointmentsController;