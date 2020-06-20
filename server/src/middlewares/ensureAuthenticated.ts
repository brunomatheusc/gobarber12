import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';

export default function ensureAuthenticated(req: Request, res: Response, next: NextFunction): void {
	const authHeader = req.headers.authorization;

	if (!authHeader) {
		throw new Error('JWT token is missing');
	}

	const [, token] = authHeader.split(' ');

	const { jwt: { secret }} = authConfig;

	try {
		const decodedToken = verify(token, secret);

		return next();
	} catch (error) {
		throw new Error('Invalid JWT Token');		
	}

}