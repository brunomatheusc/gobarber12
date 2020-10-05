import { Response, Request } from 'express';
import { container } from 'tsyringe';
import UpdateUserAvatarService from './../services/UpdateUserAvatarService';
import { classToClass } from 'class-transformer';

class UserAvatarController {
	public async update(req: Request, res: Response) {
		const { id: userId } = req.user;
		console.log(req.file);
		const avatar = req.file.filename;

		const updateUserAvatar = container.resolve(UpdateUserAvatarService);

		const user = await updateUserAvatar.execute({ userId, avatar: avatar });

		return res.json(classToClass(user));
	}
}

export default new UserAvatarController;
