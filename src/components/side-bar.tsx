"use client";

import FONT from "@/constants/fontFamily";
import { twMerge } from "tailwind-merge";
import { SidebarItem } from "./side-bar-item";
import ThemeSwitcher from "./theme-switcher";
import { Button } from "@nextui-org/react";
import { signOut } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";

export function Sidebar() {
	const router = useRouter();

	const PAGES = [
		{ name: "home", title: "Home page" },
		{ name: "shared", title: "Shared files" },
	];

	return (
		<div className=" px-6 py-8 bg-foreground-50 flex flex-col">
			<div className=" flex justify-between">
				<h1
					className={twMerge(
						FONT.primary.className,
						" font-bold text-2xl text-foreground-900"
					)}
				>
					THG
				</h1>
				<ThemeSwitcher />
			</div>
			<div className=" flex-1 mt-12 flex flex-col justify-between">
				<div className=" flex flex-col gap-2">
					{PAGES.map(({ name, title }) => (
						<SidebarItem key={name} name={name} title={title} />
					))}
				</div>
				<Button
					onPress={async () => {
						await signOut();
						router.push("/signin");
					}}
				>
					Sign out
				</Button>
			</div>
		</div>
	);
}
