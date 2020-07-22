import { Response, Request } from 'express';
import { container } from 'tsyringe';
import UpdateUserAvatarService from './../services/UpdateUserAvatarService';

class UserAvatarController {
	public async update(req: Request, res: Response) {
		const { id: userId } = req.user;
		const avatar = req.file.filename;

		const updateUserAvatar = container.resolve(UpdateUserAvatarService);

		const user = await updateUserAvatar.execute({ userId, avatar: avatar });

		delete user.password;

		return res.json(user);
	}
}

export default new UserAvatarController;
