import {
	onAuthStateChanged as _onAuthStateChanged,
	getAuth,
	getIdToken,
	GoogleAuthProvider,
	NextOrObserver,
	signInWithPopup,
	User,
} from "firebase/auth";
import { app, firebaseConfig } from "./firebase-app";
import { getInstallations, getToken } from "firebase/installations";
import { headers } from "next/headers";
import { initializeServerApp } from "firebase/app";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();

provider.addScope("https://www.googleapis.com/auth/userinfo.profile");

export function onAuthStateChanged(cb: NextOrObserver<User>) {
	return _onAuthStateChanged(auth, cb);
}

export async function signInWithGoogle() {
	const provider = new GoogleAuthProvider();

	try {
		await signInWithPopup(auth, provider);
	} catch (error) {
		console.error("Error signing in with Google", error);
	}
}

export async function signOut() {
	try {
		return auth.signOut();
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

export async function getAuthenticatedAppForUser() {
	const idToken = headers().get("Authorization")?.split("Bearer ")[1];
	const firebaseServerApp = initializeServerApp(
		firebaseConfig,
		idToken
			? {
					authIdToken: idToken,
			  }
			: {}
	);

	const auth = getAuth(firebaseServerApp);
	await auth.authStateReady();

	return { firebaseServerApp, currentUser: auth.currentUser };
}

function useUserSession(initialUser: User) {
	// The initialUser comes from the server via a server component
	const [user, setUser] = useState(initialUser);
	const router = useRouter();

	// Register the service worker that sends auth state back to server
	// The service worker is built with npm run build-service-worker
	useEffect(() => {
		if ("serviceWorker" in navigator) {
			const serializedFirebaseConfig = encodeURIComponent(
				JSON.stringify(firebaseConfig)
			);
			const serviceWorkerUrl = `/auth-service-worker.js?firebaseConfig=${serializedFirebaseConfig}`;

			navigator.serviceWorker
				.register(serviceWorkerUrl)
				.then((registration) =>
					console.log("scope is: ", registration.scope)
				);
		}
	}, []);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged((authUser) => {
			if (authUser) setUser(authUser);
		});

		return () => unsubscribe();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		onAuthStateChanged((authUser) => {
			if (user === undefined) return;

			// refresh when user changed to ease testing
			if (user?.email !== authUser?.email) {
				router.refresh();
			}
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);

	return user;
}
