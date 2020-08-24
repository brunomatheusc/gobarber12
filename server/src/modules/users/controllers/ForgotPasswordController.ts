import { Response, Request } from 'express';
import { container } from 'tsyringe';
import SendForgotPasswordEmailService from './../services/SendForgotPasswordEmailService';

class ForgotPassworController {
	public async create(req: Request, res: Response) {
		const { email } = req.body;
		
		const sendForgotPasswordEmail = container.resolve(SendForgotPasswordEmailService);

		await sendForgotPasswordEmail.execute({ email });

		return res.status(204).json();
	}
}

export default new ForgotPassworController;