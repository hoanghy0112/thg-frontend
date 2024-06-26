import { AppFile } from "@/types/AppFile";
import { User } from "firebase/auth";
import {
	collection,
	doc,
	DocumentData,
	orderBy,
	Query,
	query,
	setDoc,
	where,
} from "firebase/firestore";
import { db } from "../firebase/firestore";

export function viewFileList(
	user: User,
	folderId: string
): Query<DocumentData, DocumentData> {
	return query(
		collection(db, "users", user.uid, "files"),
		where("folder", "==", folderId),
		orderBy("createdAt", "desc")
	);
}

export async function updateFile(
	user: User,
	fileId: string,
	data: Partial<AppFile>
) {
	const fileRef = doc(db, "users", user.uid, "files", fileId);

	await setDoc(fileRef, data, { merge: true });
}
