import { deleteCookie, setCookie } from "cookies-next";
import {
	onAuthStateChanged as _onAuthStateChanged,
	getAuth,
	getIdToken,
	GoogleAuthProvider,
	NextOrObserver,
	signInWithPopup,
	User,
} from "firebase/auth";
import { getInstallations, getToken } from "firebase/installations";
import { app } from "./firebase-app";

export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();

provider.addScope("https://www.googleapis.com/auth/userinfo.profile");

export function onAuthStateChanged(cb: NextOrObserver<User>) {
	return _onAuthStateChanged(auth, cb);
}

export async function signInWithGoogle() {
	const provider = new GoogleAuthProvider();

	try {
		const userCredential = await signInWithPopup(auth, provider);
		setCookie("isSignin", true);
		return userCredential.user;
	} catch (error) {
		console.error("Error signing in with Google", error);
	}
}

export async function signOut() {
	try {
		deleteCookie("isSignin");
		return await auth.signOut();
	} catch (error) {
		console.error("Error signing out with Google", error);
	}
}

export async function fetchWithFirebaseHeaders(request: Request) {
	const auth = getAuth(app);
	const installations = getInstallations(app);
	const headers = new Headers(request.headers);
	const [authIdToken, installationToken] = await Promise.all([
		getAuthIdToken(),
		getToken(installations),
	]);
	headers.append("Firebase-Instance-ID-Token", installationToken);
	if (authIdToken) headers.append("Authorization", `Bearer ${authIdToken}`);
	const newRequest = new Request(request, { headers });
	return await fetch(newRequest);
}

async function getAuthIdToken() {
	await auth.authStateReady();
	if (!auth.currentUser) return;
	return await getIdToken(auth.currentUser);
}
