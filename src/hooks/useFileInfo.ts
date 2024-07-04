import { db } from "@/lib/firebase/firestore";
import { AppFile } from "@/types/AppFile";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useUser } from "./useUser";

export function useFileInfo(id: string) {
	const [file, setFile] = useState<AppFile>();
	const [exist, setExist] = useState<boolean | null>(null);

	const user = useUser();

	useEffect(() => {
		if (!user) return;

		const unsubscribe = onSnapshot(
			doc(db, "users", user.uid, "files", id),
			(doc) => {
				setFile(doc.data() as AppFile);
				setExist(doc.exists());
			}
		);

		return unsubscribe;
	}, [user, id]);

	return { file, exist };
}
