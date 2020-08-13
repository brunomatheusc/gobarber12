import IStorageProvider from "../models/IStorageProvider";
import fs from 'fs';
import path from 'path';
import upload from "../../../../../config/upload";

export default class DiskStorageProvider implements IStorageProvider {
	public async saveFile(file: string): Promise<string> {
		await fs.promises.rename(
			path.resolve(upload.tmpFolder, file),
			path.resolve(upload.uploadsFolder, 'uploads', file),
		);

		return file;
	}

	public async deleteFile(file: string): Promise<void> {
		const filePath = path.resolve(upload.uploadsFolder, file);

		try {
			await fs.promises.stat(filePath);
		} catch (error) {
			return; 
		}

		await fs.promises.unlink(filePath);
	}
}