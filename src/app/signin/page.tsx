"use client";

import { updateUser } from "@/lib/core/manage-user";
import { signInWithGoogle } from "@/lib/firebase/auth";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function Page() {
	const router = useRouter();

	return (
		<div className=" w-screen h-screen flex bg-background">
			<div className=" flex-1 flex flex-col gap-4 items-center justify-center">
				<p className=" text-foreground-900 font-semibold text-xl">
					Welcome to{" "}
				</p>
				<p className=" text-foreground-900 font-bold text-2xl">
					THG File manager
				</p>
				<Button
					className=" mt-4"
					onPress={async () => {
						const user = await signInWithGoogle();
						if (!user) return;
						await updateUser(user);
						router.replace("/home");
					}}
				>
					<p className=" font-semibold"> Sign in with Google</p>
				</Button>
			</div>
		</div>
	);
}
