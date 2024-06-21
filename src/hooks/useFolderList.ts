import { viewFolderList } from "@/lib/core/manage-folder";
import { Folder } from "@/types/Folder";
import { useEffect, useState } from "react";
import { useUser } from "./useUser";

export function useFolderList(parentFolderId: string) {
	const [folders, setFolders] = useState<Folder[]>([]);
	const user = useUser();

	useEffect(() => {
		if (!user) return;

		(async () => {
			setFolders(await viewFolderList(user, parentFolderId));
		})();
	}, [user, parentFolderId]);

	return folders;
}
