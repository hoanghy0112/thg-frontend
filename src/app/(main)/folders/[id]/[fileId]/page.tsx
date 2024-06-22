"use client";

import FONT from "@/constants/fontFamily";
import { useFileInfo } from "@/hooks/useFileInfo";
import { twMerge } from "tailwind-merge";

export default function Page({
	params: { fileId },
}: {
	params: { fileId: string };
}) {
	const file = useFileInfo(fileId);

	return (
		<div className=" w-[200px] bg-foreground-100 p-4 rounded-xl">
			<p
				className={twMerge(
					" text-foreground-900 font-medium",
					FONT.primary.className
				)}
			>
				{file?.name}
			</p>
		</div>
	);
}
