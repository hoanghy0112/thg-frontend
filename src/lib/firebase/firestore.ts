import { joinFolder } from "@/utils/joinFolder";
import { S3 } from "aws-sdk";
import { User } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { app } from "./firebase-app";

export const db = getFirestore(app);

export async function saveFileInformation(
	file: File,
	data: S3.ManagedUpload.SendData,
	folder: string[],
	user: User
) {
	const folderLink = joinFolder(folder);
	const fileName = data.Key;
	return await setDoc(doc(db, "users", user.uid, "files", fileName), {
		name: file.name,
		size: file.size,
		type: file.type,
		location: data.Location,
		key: data.Key,
		bucket: data.Bucket,
		folder: folderLink,
		createdAt: new Date(),
	});
}
