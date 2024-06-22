import { db } from "@/lib/firebase/firestore";
import { Folder } from "@/types/Folder";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useUser } from "./useUser";

export function useFolderInfo(id: string) {
	const [folder, setFolder] = useState<Folder>();

	const user = useUser();

	useEffect(() => {
		if (!user) return;

		const unsubscribe = onSnapshot(
			doc(db, "users", user.uid, "folders", id),
			(doc) => {
				setFolder(doc.data() as Folder);
			}
		);

		return unsubscribe;
	}, [user, id]);

	return folder;
}
