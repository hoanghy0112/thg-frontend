import { viewSharedFileList } from "@/lib/core/manage-file";
import { AppFile } from "@/types/AppFile";
import { SharedFile } from "@/types/SharedFile";
import { onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useUser } from "./useUser";

export function useSharedFileList() {
	const [files, setFiles] = useState<SharedFile[]>([]);
	const user = useUser();

	useEffect(() => {
		if (!user) return;

		const query = viewSharedFileList(user);

		const unsubscribe = onSnapshot(query, (docs) => {
			const files = docs.docs.map((doc) => doc.data()) as SharedFile[];
			setFiles(files);
		});

		return unsubscribe;
	}, [user]);

	return files;
}
