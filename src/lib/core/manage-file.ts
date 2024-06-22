import { User } from "firebase/auth";
import {
    collection,
    DocumentData,
    Query,
    query,
    where,
} from "firebase/firestore";
import { db } from "../firebase/firestore";

export function viewFileList(
	user: User,
	folderId: string
): Query<DocumentData, DocumentData> {
	return query(
		collection(db, "users", user.uid, "files"),
		where("folder", "==", folderId)
	);
}
