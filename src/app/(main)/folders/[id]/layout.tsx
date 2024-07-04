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
import { ReactNode } from "react";

export default function Layout({
	params: { id },
	children,
}: {
	params: { id: string };
	children: ReactNode;
}) {
	const router = useRouter();

	const folder = useFolderInfo(id);
	const files = useFileList(id);
	const folders = useFolderList(id);

	return (
		<div className=" flex-1">
			<BackButton onPress={() => router.back()} />
			<div className=" mt-6 flex flex-row gap-6">
				<div className=" mt-2 flex-1 transition-all duration-300">
					<div className=" ml-2 flex flex-row justify-between">
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
							<FileList folderId={id} files={files} />
						</div>
					</div>
				</div>
				<div className="">{children}</div>
			</div>
		</div>
	);
}
