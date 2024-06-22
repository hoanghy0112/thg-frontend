"use client";

import BackButton from "@/components/back-button";
import FileList from "@/components/file-list";
import FolderFileUpload from "@/components/folder-file-upload";
import FolderList from "@/components/folder-list";
import TitleText from "@/components/title-text";
import { useFileList } from "@/hooks/useFileList";
import { useFolderInfo } from "@/hooks/useFolderInfo";
import { useFolderList } from "@/hooks/useFolderList";
import { useRouter } from "next/navigation";

export default function Page({ params: { id } }: { params: { id: string } }) {
	const router = useRouter();

	const folder = useFolderInfo(id);
	const files = useFileList(id);
	const folders = useFolderList(id);

	return (
		<div>
			<BackButton onPress={() => router.back()} />
			<div className=" ml-2 mt-6 flex flex-row justify-between">
				<div className="flex flex-col gap-1">
					<p className=" text-foreground-600">Folder</p>
					<h1 className=" text-foreground-900 font-bold text-2xl">
						{folder?.name}
					</h1>
				</div>
				<FolderFileUpload folderId={id} />
			</div>
			<div className=" mt-8 flex flex-col gap-6">
				<div className=" flex flex-col gap-4">
					<TitleText className=" px-2">Folders</TitleText>
					<FolderList folders={folders} />
				</div>
				<div className=" flex flex-col gap-4">
					<TitleText className=" px-2">Files</TitleText>
					<FileList files={files} />
				</div>
			</div>
		</div>
	);
}
