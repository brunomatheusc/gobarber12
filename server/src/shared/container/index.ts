import { container } from 'tsyringe';

import '../../modules/users/providers';
import './providers';

import IAppointmentsRepository from '../../modules/appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '../../modules/appointments/typeorm/repositories/AppointmentsRepository';

import IUserRepository from '../../modules/users/repositories/IUserRepository';
import UsersRepository from '../../modules/users/typeorm/repositories/UsersRepository';

import IUserTokensRepository from './../../modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from './../../modules/users/typeorm/repositories/UserTokensRepository';

container.registerSingleton<IAppointmentsRepository>('AppointmentsRepository', AppointmentsRepository);
container.registerSingleton<IUserRepository>('UsersRepository', UsersRepository);
container.registerSingleton<IUserTokensRepository>('UserTokensRepository', UserTokensRepository);