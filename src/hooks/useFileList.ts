import { viewFileList } from "@/lib/core/manage-file";
import { AppFile } from "@/types/AppFile";
import { useEffect, useState } from "react";
import { useUser } from "./useUser";
import { onSnapshot } from "firebase/firestore";

export function useFileList(parentFolderId: string) {
	const [files, setFiles] = useState<AppFile[]>([]);
	const user = useUser();

	useEffect(() => {
		if (!user) return;

		const query = viewFileList(user, parentFolderId);

		const unsubscribe = onSnapshot(query, (docs) => {
			const folders = docs.docs.map((doc) => doc.data()) as AppFile[];
			setFiles(folders);
		});

		return unsubscribe;
	}, [user, parentFolderId]);

	return files;
}
