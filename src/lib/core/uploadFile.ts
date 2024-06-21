import { User } from "firebase/auth";
import { uploadFileToS3 } from "../aws/s3";
import { saveFileInformation } from "../firebase/firestore";

export async function uploadFile(file: File, folder: string[], user: User) {
	try {
		const data = await uploadFileToS3(file);
		await saveFileInformation(file, data, folder, user);
	} catch (error) {
		console.log({ error });
		throw error;
	}
}
