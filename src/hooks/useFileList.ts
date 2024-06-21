import { viewFileList } from "@/lib/core/manage-file";
import { AppFile } from "@/types/AppFile";
import { useEffect, useState } from "react";
import { useUser } from "./useUser";

export function useFileList(parentFolderId: string) {
	const [files, setFiles] = useState<AppFile[]>([]);
	const user = useUser();

	useEffect(() => {
		if (!user) return;

		(async () => {
			setFiles(await viewFileList(user, parentFolderId));
		})();
	}, [user, parentFolderId]);

	return files;
}
