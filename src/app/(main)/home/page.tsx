"use client";

import FolderItem from "@/components/folder-item";
import TitleText from "@/components/title-text";
import FONT from "@/constants/fontFamily";
import { useFolderList } from "@/hooks/useFolderList";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";

export default function Page() {
	const router = useRouter();

	const folders = useFolderList();

	return (
		<div className=" flex-1 flex flex-col gap-6">
			<div className=" flex flex-col gap-4">
				<TitleText className=" px-3">Folders</TitleText>
				{folders.length ? (
					<div className=" grid grid-cols-2 xl:grid-cols-5 gap-4">
						{folders.map((folder) => (
							<FolderItem
								onPress={(id: string) => {
									router.push(`/folders/${id}`);
								}}
								folder={folder}
								key={folder.id}
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
							There are no folders found in this view
						</p>
					</div>
				)}
			</div>
		</div>
	);
}
