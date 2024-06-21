import { Folder } from "@/types/Folder";
import { User } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firestore";

export async function viewFolderList(
	user: User,
	folderId: string
): Promise<Folder[]> {
	const docs = await getDocs(
		query(
			collection(db, "users", user.uid, "files"),
			where("folder", "==", folderId)
		)
	);
	return docs.docs.map((doc) => doc.data()) as Folder[];
}
