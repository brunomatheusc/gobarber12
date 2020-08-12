import { container } from 'tsyringe';

import '../../modules/users/providers';
import './providers';

import IAppointmentsRepository from '../../modules/appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '../../modules/appointments/typeorm/repositories/AppointmentsRepository';

import IUserRepository from '../../modules/users/repositories/IUserRepository';
import UsersRepository from '../../modules/users/typeorm/repositories/UsersRepository';

container.registerSingleton<IAppointmentsRepository>('AppointmentsRepository', AppointmentsRepository);
container.registerSingleton<IUserRepository>('UsersRepository', UsersRepository);