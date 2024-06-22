import { User } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firestore";

export async function updateUser(user: User) {
	const userRef = doc(db, "users", user.uid);

	await setDoc(
		userRef,
		{
			uid: user.uid,
			displayName: user.displayName,
			email: user.email,
			photoURL: user.photoURL,
		},
		{ merge: true }
	);
}
