import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../../../../config/auth';
import AppError from './../../../../shared/errors/AppError';

interface TokenPayload {
	iat: number;
	exp: number;
	sub: string;
}

export default function ensureAuthenticated(req: Request, res: Response, next: NextFunction): void {
	const authHeader = req.headers.authorization;

	if (!authHeader) {
		throw new AppError('JWT token is missing');
	}

	const [, token] = authHeader.split(' ');

	const { jwt: { secret }} = authConfig;

	try {
		const decodedToken = verify(token, secret) as TokenPayload;

		const { sub } = decodedToken;

		req.user = { id: sub };

		return next();
	} catch {
		throw new AppError('Invalid JWT Token');		
	}
}