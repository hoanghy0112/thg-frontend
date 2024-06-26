"use client";

import { useUser } from "@/hooks/useUser";
import { touchFile } from "@/lib/core/manage-file";
import { AppFile } from "@/types/AppFile";
import { useEffect } from "react";

type Props = {
	ownerId: string;
	file: AppFile;
};

export default function SharedFileHandler({ ownerId, file }: Props) {
	const user = useUser();

	useEffect(() => {
		if (user) touchFile(ownerId, user.uid, file.id);
	}, [file.id, user, ownerId]);

	return <></>;
}
