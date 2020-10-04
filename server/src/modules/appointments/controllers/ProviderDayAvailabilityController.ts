import { Response, Request } from 'express';
import { container } from 'tsyringe';
import ListProviderDayAvailabilityService from './../services/ListProviderDayAvailabilityService';

class ProviderDayAvailabilityController {
	public async index(req: Request, res: Response) {		
		const { providerId } = req.params;	
		const { month, year, day } = req.body;

		const listProviderDay = container.resolve(ListProviderDayAvailabilityService);
		const availability = await listProviderDay.execute({ providerId, month, year, day });
	
		return res.json(availability);		
	}
}

export default new ProviderDayAvailabilityController;