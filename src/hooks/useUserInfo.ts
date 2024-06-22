import { db } from "@/lib/firebase/firestore";
import { User } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

export function useUserInfo(id: string) {
	const [user, setUser] = useState<User>();
	const [exist, setExist] = useState<boolean | null>(null);

	useEffect(() => {
		const unsubscribe = onSnapshot(doc(db, "users", id), (doc) => {
			setUser(doc.data() as User);
			setExist(doc.exists());
		});

		return unsubscribe;
	}, [id]);

	return { user, exist };
}
