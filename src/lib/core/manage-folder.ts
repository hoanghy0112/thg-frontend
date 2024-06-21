import { User } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firestore";

export async function viewFolderList(user: User, folderId: string) {
	const docs = await getDocs(
		query(
			collection(db, "users", user.uid, "files"),
			where("folder", "==", folderId)
		)
	);
	console.log(docs.docs);
}
