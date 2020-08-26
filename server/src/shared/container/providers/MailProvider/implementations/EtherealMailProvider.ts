import nodemailer, { Transporter } from 'nodemailer';
import { inject, injectable } from 'tsyringe';
import IMailProvider from './../models/IMailProvider';
import ISendMailDTO from './../dtos/ISendMailDTO';
import IMailTemplateProvider from './../../MailTemplateProvider/models/IMailTemplateProvider';
import { template } from 'handlebars';

@injectable()
class EtherealMailProvider implements IMailProvider {
	private client: Transporter;
	
	constructor(
		@inject('MailTemplateProvider')
		private mailTemplateProvider: IMailTemplateProvider
	) {
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

	async sendMail({ to, from, subject, template }: ISendMailDTO): Promise<void> {
		const message = await this.client.sendMail({
			from: {
				name: from?.name || "Equipe GoBarber",
				address: from?.email || "equipe@gobarber.com.br"
			},
			to: {
				name: to.name,
				address: to.email
			},
			subject,
			html: await this.mailTemplateProvider.parse(template),
		});

		console.log(`Mensagem enviada: ${message.messageId}`);
		console.log(`URL: ${nodemailer.getTestMessageUrl(message)}`);
	}
}

export default EtherealMailProvider;