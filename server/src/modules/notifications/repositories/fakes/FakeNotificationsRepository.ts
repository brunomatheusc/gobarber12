import { ObjectID } from 'mongodb';
import { EntityRepository, getMongoRepository, MongoRepository } from 'typeorm';
import ICreateNotificationDTO from './../../dtos/ICreateNotificationDTO';
import Notification from './../../typeorm/schemas/Notification';
import INotificationsRepository from './../INotificationRepository';


@EntityRepository(Notification)
class FakeNotificationsRepository implements INotificationsRepository {
	private notifications: Notification[] = [];

	public async create({ content, recipientId }: ICreateNotificationDTO): Promise<Notification> {
		const notification = new Notification();

		Object.assign(notification, { id: new ObjectID(), content, recipientId });

		this.notifications.push(notification);
		
		return notification;
	}

}

export default FakeNotificationsRepository;