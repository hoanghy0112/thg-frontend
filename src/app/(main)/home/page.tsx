"use client";

import { useUser } from "@/hooks/useUser";
import { viewFileList } from "@/lib/core/manage-file";
import { viewFolderList } from "@/lib/core/manage-folder";
import { useEffect } from "react";

export default function Page() {
	const user = useUser();

	useEffect(() => {
		if (!user) return;

		viewFolderList(user, "");
		viewFileList(user, "");
	}, [user]);

	return (
		<div>
			<p>This is home page</p>
		</div>
	);
}
