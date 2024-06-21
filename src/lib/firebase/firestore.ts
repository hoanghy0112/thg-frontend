import { joinFolder } from "@/utils/joinFolder";
import { S3 } from "aws-sdk";
import { User } from "firebase/auth";
import {
	collection,
	doc,
	getDocs,
	getFirestore,
	query,
	setDoc,
	where,
} from "firebase/firestore";
import { v4 } from "uuid";
import { app } from "./firebase-app";
import toast from "react-hot-toast";

export const db = getFirestore(app);

export async function saveFolderInformation({
	folderName,
	user,
	folders,
	options,
}: {
	folderName: string;
	user: User;
	folders: string[];
	options?: {
		color: string;
		icon: string;
	};
}) {
	const folderLink = joinFolder(folders);
	const folderId = v4();
	await setDoc(doc(db, "users", user.uid, "folders", folderId), {
		name: folderName,
		parent: folderLink,
		...(options || {
			color: "default",
			icon: "default",
		}),
	});
}

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
