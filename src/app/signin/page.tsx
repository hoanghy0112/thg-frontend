"use client";

import { signInWithGoogle } from "@/lib/firebase/auth";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function Page() {
	const router = useRouter();

	return (
		<div className=" w-screen h-screen flex bg-background">
			<div>
				<p>Welcome to </p>
				<p>THG File manager</p>
			</div>
			<div>
				<p>Login</p>
				<Button
					onPress={async () => {
						await signInWithGoogle();
						router.replace("/home");
					}}
				>
					Sign in with Google
				</Button>
			</div>
		</div>
	);
}
