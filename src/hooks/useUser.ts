"use client";

import { auth } from "@/lib/firebase/auth";
import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";

export function useUser() {
	const [user, setUser] = useState<User>();

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (authUser) => {
			if (authUser) setUser(authUser);
		});

		return () => unsubscribe();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return user;
}
