import IUserRepository from '../repositories/IUserRepository';
import { injectable, inject } from 'tsyringe';
import IMailProvider from './../../../shared/container/providers/MailProvider/models/IMailProvider';
import AppError from './../../../shared/errors/AppError';
import IUserTokensRepository from './../repositories/IUserTokensRepository';

import path from 'path';

interface IRequest {
	email: string;
}

@injectable()
export default class SendForgotPasswordEmailService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUserRepository,

		@inject('MailProvider')
		private mailProvider: IMailProvider,

		@inject('UserTokensRepository')
		private userTokensRepository: IUserTokensRepository
	) {}

	public async execute({ email }: IRequest): Promise<void> {
		const user = await this.usersRepository.findByEmail(email);

		if (!user) {
			throw new AppError(`User doesn't exists`);
		}

		const { token } = await this.userTokensRepository.generate(user.id);

		const forgotPasswordTemplate = path.resolve(__dirname, '..', 'views', 'forgot_password.hbs');

		await this.mailProvider.sendMail({
			to: {
				name: user.name,
				email: user.email
			},
			subject: '[GoBarber] Recuperação de Senha',
			template: {
				file: forgotPasswordTemplate,
				variables: {
					name: user.name,
					link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`
				}
			}
		});
	}
}