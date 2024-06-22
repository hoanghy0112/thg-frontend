import { S3 } from "aws-sdk";
import { User } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { v4 } from "uuid";
import { app } from "./firebase-app";

export const db = getFirestore(app);

export async function saveFolderInformation({
	folderName,
	user,
	folderId,
	options,
}: {
	folderName: string;
	user: User;
	folderId: string;
	options?: {
		color: string;
		icon: string;
	};
}) {
	const id = v4();
	await setDoc(doc(db, "users", user.uid, "folders", id), {
		id,
		name: folderName,
		folder: folderId,
		...(options || {
			color: "default",
			icon: "default",
		}),
	});
}

export async function saveFileInformation(
	file: File,
	data: S3.ManagedUpload.SendData,
	folderId: string,
	user: User
) {
	const fileName = data.Key;
	return await setDoc(doc(db, "users", user.uid, "files", fileName), {
		id: fileName,
		name: file.name,
		size: file.size,
		type: file.type,
		location: data.Location,
		key: data.Key,
		bucket: data.Bucket,
		folder: folderId,
		isSharable: false,
		createdAt: new Date(),
	});
}
