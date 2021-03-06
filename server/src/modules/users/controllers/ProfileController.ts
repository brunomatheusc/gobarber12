import { Request, Response } from 'express';
import CreateUserService from './../services/CreateUserService';
import { container } from 'tsyringe';
import UpdateProfileService from './../services/UpdateProfileService';
import ShowProfileService from './../services/ShowProfileService';

import { classToClass } from 'class-transformer';

class ProfileController {
	public async show(req: Request, res: Response) {
		try {
			const userId = req.user.id;

			const showProfile = container.resolve(ShowProfileService);
			const user = await showProfile.execute({ userId });

			return res.json(classToClass(user));
		} catch (error) {
			return res.status(400).json({ message: error.message });						
		}
	}

	public async update(req: Request, res: Response) {
		try {
			const userId = req.user.id;

			const { name, email, oldPassword, password } = req.body;

			const updatedProfile = container.resolve(UpdateProfileService);

			const user = await updatedProfile.execute({ userId, name, email, oldPassword, password })

			return res.json({ user: classToClass(user) });
		} catch (error) {
			return res.status(400).json({ message: error.message });			
		}
	}

	public read(req: Request, res: Response) {

	}
}

export default new ProfileController;