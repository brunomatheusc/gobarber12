import IMailProvider from './../models/IMailProvider';
import nodemailer, { Transporter } from 'nodemailer';

class EtherealMailProvider implements IMailProvider {
	private client: Transporter;

	constructor() {
		nodemailer.createTestAccount().then(account => {
			this.client = nodemailer.createTransport({
				host: account.smtp.host,
				port: account.smtp.port,
				secure: account.smtp.secure,
				auth: {
					user: account.user,
					pass: account.pass
				}
			});
		});
	}

	async sendMail(to: string, body: string): Promise<void> {
		const message = await this.client.sendMail({
			from: 'Equipe GoBarber <equipe@gobarber.com.br>',
			to,
			subject: 'Recuperação de senha',
			text: body,
		});

		console.log(`Mensagem enviada: ${message.messageId}`);
		console.log(`URL: ${nodemailer.getTestMessageUrl(message)}`);
	}
}

export default new EtherealMailProvider;