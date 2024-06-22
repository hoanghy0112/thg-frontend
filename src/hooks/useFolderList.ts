import { viewFolderList } from "@/lib/core/manage-folder";
import { Folder } from "@/types/Folder";
import { onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useUser } from "./useUser";

export function useFolderList(parentFolderId = "") {
	const [folders, setFolders] = useState<Folder[]>([]);
	const user = useUser();

	useEffect(() => {
		if (!user) return;

		const query = viewFolderList(user, parentFolderId);

		const unsubscribe = onSnapshot(query, (docs) => {
			const folders = docs.docs.map((doc) => doc.data()) as Folder[];
			setFolders(folders);
		});

		return unsubscribe;
	}, [user, parentFolderId]);

	return folders;
}
