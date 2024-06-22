"use client";

import FolderItem from "@/components/folder-item";
import TitleText from "@/components/title-text";
import { useFolderList } from "@/hooks/useFolderList";
import { useRouter } from "next/navigation";

export default function Page() {
	const router = useRouter();

	const folders = useFolderList();

	return (
		<div className=" flex flex-col gap-6">
			<div className=" flex flex-col gap-4">
				<TitleText className=" px-3">Folders</TitleText>
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
			</div>
		</div>
	);
}
