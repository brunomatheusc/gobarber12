export default class AppError {
	constructor(readonly message: string, readonly statusCode = 400) {}	
}