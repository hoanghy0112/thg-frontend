import { Folder } from "@/types/Folder";
import FolderItem from "./folder-item";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import FONT from "@/constants/fontFamily";

export default function FolderList({ folders }: { folders: Folder[] }) {
	const router = useRouter();

	return folders.length ? (
		<div className=" grid grid-cols-2 xl:grid-cols-3 gap-4">
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
	);
}
