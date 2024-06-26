"use client";

import SharedFileItem from "@/components/shared-file-item";
import TitleText from "@/components/title-text";
import FONT from "@/constants/fontFamily";
import { useSharedFileList } from "@/hooks/useSharedFileList";
import { getFileShareLink } from "@/lib/core/manage-share";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";

export default function Page() {
	const router = useRouter();

	const files = useSharedFileList();

	return (
		<div className=" flex-1 flex flex-col gap-4">
			<TitleText className=" px-2">Shared files</TitleText>
			{files.length ? (
				<div className=" grid grid-cols-2 xl:grid-cols-3 gap-4">
					{files.map((file) => (
						<SharedFileItem
							onPress={() =>
								router.push(getFileShareLink(file.id, file.ownerId))
							}
							sharedFile={file}
							key={file.id}
						/>
					))}
				</div>
			) : (
				<div className=" bg-foreground-100 flex items-center justify-center p-8 rounded-xl">
					<p
						className={twMerge(
							" text-foreground-500 font-semibold",
							FONT.primary.className
						)}
					>
						There are no files found in this view
					</p>
				</div>
			)}
		</div>
	);
}
