import { db } from "@/lib/firebase/firestore";
import { AppFile } from "@/types/AppFile";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

export function useSharedFileInfo(id: string, userId: string) {
	const [file, setFile] = useState<AppFile>();
	const [exist, setExist] = useState<boolean | null>(null);

	useEffect(() => {
		const unsubscribe = onSnapshot(
			doc(db, "users", userId, "files", id),
			(doc) => {
				setFile(doc.data() as AppFile);
				setExist(doc.exists());
			}
		);

		return unsubscribe;
	}, [userId, id]);

	return { file, exist };
}
