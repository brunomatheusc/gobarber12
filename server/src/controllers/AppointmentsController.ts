import { Response, Request } from 'express';
import CreateAppointmentService from './../services/CreateAppointmentService';
import { getCustomRepository } from 'typeorm';
import AppointmentsRepository from './../repositories/AppointmentsRepository';
import { parseISO } from 'date-fns';

class AppointmentsController {
	public async create(req: Request, res: Response) {		
		try {		
			const { provider_id, date } = req.body;
			const parsedDate = parseISO(date);
		
			const createAppointment = new CreateAppointmentService();
			const appointment = await createAppointment.execute({ provider_id, date: parsedDate });
		
			return res.json(appointment);		
		} catch (error) {
			return res.status(400).json({ message: error.message })
		}	
	}

	public async read(req: Request, res: Response) {
		const appointmentsRepository = getCustomRepository(AppointmentsRepository);

		return res.json(await appointmentsRepository.find());
	}
}

export default new AppointmentsController;