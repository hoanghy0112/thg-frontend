import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firestore";

export async function viewFolderList(folderId: string) {
	const docs = await getDocs(
		query(collection(db, "folders"), where("folder", "==", folderId))
	);
	console.log(docs.docs);
}
