import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const tmpFolder = path.resolve(__dirname, '..', '..', 'temp');
const uploadsFolder = path.resolve(tmpFolder, 'uploads');

export default {
	directory: tmpFolder,
	tmpFolder,
	uploadsFolder,
	
	storage: multer.diskStorage({
		destination: path.resolve(__dirname, '..', '..', 'temp'),
		filename(request, file, callback) {
			const fileHash = crypto.randomBytes(10).toString('hex');
			const fileName = `${fileHash}-${file.originalname}`;

			return callback(null, fileName);
		}
	}),
}