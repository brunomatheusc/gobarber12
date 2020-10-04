import { Response, Request } from 'express';
import { container } from 'tsyringe';
import ListProviderMonthAvailabilityService from './../services/ListProviderMonthAvailabilityService';

class ProviderMonthAvailabilityController {
	public async index(req: Request, res: Response) {		
		const { providerId } = req.params;	
		const { month, year } = req.body;

		const listProviderMonth = container.resolve(ListProviderMonthAvailabilityService);
		const availability = await listProviderMonth.execute({ providerId, month, year });
	
		return res.json(availability);		
	}
}

export default new ProviderMonthAvailabilityController;