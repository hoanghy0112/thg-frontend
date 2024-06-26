import { S3 } from "aws-sdk";
import { User } from "firebase/auth";
import { deleteDoc, doc, getFirestore, setDoc } from "firebase/firestore";
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
		userId: user.uid,
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
	const fileId = data.Key.split(".").at(0) || "";
	return await setDoc(doc(db, "users", user.uid, "files", fileId), {
		id: fileId,
		name: file.name,
		size: file.size,
		type: file.type,
		location: data.Location,
		key: data.Key,
		bucket: data.Bucket,
		folder: folderId,
		isSharable: false,
		createdAt: new Date(),
		userId: user.uid,
	});
}

export async function removeFolder(id: string, user: User) {
	return await deleteDoc(doc(db, "users", user.uid, "folders", id));
}

export async function removeFile(id: string, user: User) {
	return await deleteDoc(doc(db, "users", user.uid, "files", id));
}
