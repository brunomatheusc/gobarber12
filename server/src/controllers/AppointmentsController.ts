import { Response, Request } from 'express';
import CreateAppointmentService from '../modules/appointments/services/CreateAppointmentService';
import { getCustomRepository } from 'typeorm';
import AppointmentsRepository from '../modules/appointments/typeorm/repositories/AppointmentsRepository';
import { parseISO } from 'date-fns';

class AppointmentsController {
	public async create(req: Request, res: Response) {		
		const { provider_id, date } = req.body;
		const parsedDate = parseISO(date);
	
		const create = new CreateAppointmentService();
		const appointment = await create.execute({ provider_id, date: parsedDate });
	
		return res.json(appointment);		
	}

	public async read(req: Request, res: Response) {
		const appointmentsRepository = getCustomRepository(AppointmentsRepository);

		return res.json(await appointmentsRepository.find());
	}
}

export default new AppointmentsController;