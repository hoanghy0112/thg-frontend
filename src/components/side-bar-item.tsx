"use client";

import FONT from "@/constants/fontFamily";
import { Button } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";

type Props = {
	name: string;
	title: string;
};

export function SidebarItem({ name, title }: Props) {
	const pathname = usePathname();
	const router = useRouter();

	const isSelected = pathname.split("/").at(1) === name.split("/").at(1);

	return (
		<div>
			<Button
				onPress={() => router.push(name)}
				className={twMerge(
					isSelected
						? " bg-foreground-300"
						: " bg-foreground-50 hover:bg-foreground-200"
				)}
			>
				<p
					className={twMerge(
						" min-w-52 text-start font-medium",
						FONT.primary.className
					)}
				>
					{title}
				</p>
			</Button>
		</div>
	);
}
