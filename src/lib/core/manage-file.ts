import { AppFile } from "@/types/AppFile";
import { joinFolder } from "@/utils/joinFolder";
import { User } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firestore";

export async function viewFileList(
	user: User,
	folderId: string
): Promise<AppFile[]> {
	const docs = await getDocs(
		query(
			collection(db, "users", user.uid, "files"),
			where("folder", "==", folderId)
		)
	);
	return docs.docs.map((doc) => doc.data()) as AppFile[];
}
