import { User } from "firebase/auth";
import {
	collection,
	DocumentData,
	Query,
	query,
	where,
} from "firebase/firestore";
import { db } from "../firebase/firestore";

export function viewFolderList(
	user: User,
	folderId: string
): Query<DocumentData, DocumentData> {
	return query(
		collection(db, "users", user.uid, "folders"),
		where("folder", "==", folderId)
	);
}
