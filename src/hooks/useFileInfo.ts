import { db } from "@/lib/firebase/firestore";
import { Folder } from "@/types/Folder";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useUser } from "./useUser";
import { AppFile } from "@/types/AppFile";

export function useFileInfo(id: string) {
	const [file, setFile] = useState<AppFile>();

	const user = useUser();

	useEffect(() => {
		if (!user) return;

		const unsubscribe = onSnapshot(
			doc(db, "users", user.uid, "files", id),
			(doc) => {
				setFile(doc.data() as AppFile);
			}
		);

		return unsubscribe;
	}, [user, id]);

	return file;
}
