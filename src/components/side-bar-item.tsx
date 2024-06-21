"use client";

import { Button } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";

type Props = {
	name: string;
	title: string;
};

export function SidebarItem({ name, title }: Props) {
	const pathname = usePathname();
	const router = useRouter();

	const isSelected = pathname.split("/").at(1) === name;

	return (
		<div>
			<Button
				onPress={() => router.push(name)}
				className={isSelected ? " bg-foreground-200" : " bg-foreground-50"}
			>
				<p className=" mr-16 font-medium"> {title}</p>
			</Button>
		</div>
	);
}
