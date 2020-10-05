import { EntityRepository, getMongoRepository, MongoRepository } from 'typeorm';
import INotificationsRepository from 'modules/notifications/repositories/INotificationRepository';
import ICreateNotificationDTO from './../../dtos/ICreateNotificationDTO';
import Notification from './../schemas/Notification';

@EntityRepository(Notification)
class NotificationRepository implements INotificationsRepository {
	private ormRepository: MongoRepository<Notification>;
	
	constructor() {
		this.ormRepository = getMongoRepository(Notification, 'mongo');
	}

	public async create({ content, recipientId }: ICreateNotificationDTO): Promise<Notification> {
		const notification = this.ormRepository.create({ content, recipient_id: recipientId });

		await this.ormRepository.save(notification);
		
		return notification;
	}

}

export default NotificationRepository;