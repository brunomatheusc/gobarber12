import { Response, Request } from 'express';
import { container } from 'tsyringe';
import SendForgotPasswordEmailService from './../services/SendForgotPasswordEmailService';

class ForgotPassworController {
	public async create(req: Request, res: Response) {
		try {
			const { email } = req.body;
			
			const sendForgotPasswordEmail = container.resolve(SendForgotPasswordEmailService);
	
			await sendForgotPasswordEmail.execute({ email });
	
			return res.status(204).json();			
		} catch (error) {
			return res.status(400).json({ message: error.message });
		}
	}
}

export default new ForgotPassworController;