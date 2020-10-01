import { Response, Request } from 'express';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import { container } from 'tsyringe';
import ListProvidersService from './../services/ListProvidersService';

class ProvidersController {
	private appointmentsRepository: IAppointmentsRepository;

	public async index(req: Request, res: Response) {		
		const userId = req.user.id;

		const listProviders = container.resolve(ListProvidersService);
		const providers = await listProviders.execute({ userId });
	
		return res.json(providers);		
	}
}

export default new ProvidersController;