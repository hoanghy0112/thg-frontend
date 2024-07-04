import FONT from "@/constants/fontFamily";
import { AppFile } from "@/types/AppFile";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import FileItem from "./file-item";

export default function FileList({
	folderId,
	files,
}: {
	folderId: string;
	files: AppFile[];
}) {
	const router = useRouter();

	return files.length ? (
		<div className=" grid grid-cols-2 xl:grid-cols-3 gap-4">
			{files.map((file) => (
				<FileItem
					onPress={(id: string) => {
						router.push(`/folders/${folderId}/${id}`);
					}}
					file={file}
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
	);
}
