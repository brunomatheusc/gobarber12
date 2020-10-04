import { Response, Request } from 'express';
import { container } from 'tsyringe';
import ListProviderAppointmentsService from './../services/ListProviderAppointmentsService';

class ProviderAppointmentsController {
	public async index(req: Request, res: Response) {		
		const providerId = req.user.id;
		const { day, month, year } = req.body;

		const listProvidersAppointments = container.resolve(ListProviderAppointmentsService);
		const appointments = await listProvidersAppointments.execute({ providerId, day, month, year });
	
		return res.json(appointments);		
	}
}

export default new ProviderAppointmentsController;