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
	parentFolderName,
	options,
}: {
	folderName: string;
	user: User;
	parentFolderName?: string;
	options?: {
		color: string;
		icon: string;
	};
}) {
	if (!parentFolderName) {
		const folderId = v4();
		await setDoc(doc(db, "users", user.uid, "folders", folderId), {
			name: folderName,
			parent: "",
			...(options || {
				color: "default",
				icon: "default",
			}),
		});
	} else {
		const parentDocs = await getDocs(
			query(
				collection(db, "users", user.uid, "folders"),
				where("name", "==", parentFolderName)
			)
		);
		if (!parentDocs.docs.length) {
			throw new Error("Parent folder not found");
		}

		const parentFolderId = parentDocs.docs[0];

		const folderId = v4();
		await setDoc(doc(db, "users", user.uid, "folders", folderId), {
			name: folderName,
			parent: parentFolderId,
			...(options || {
				color: "default",
				icon: "default",
			}),
		});
	}
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
