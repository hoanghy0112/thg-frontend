"use client";

import { useSharedFileInfo } from "@/hooks/useSharedFileInfo";
import { SharedFile } from "@/types/SharedFile";
import { ButtonGroup } from "@nextui-org/react";
import FileDetailModalButton from "./file-detail-modal-button";
import FileDropDown from "./file-dropdown";

export default function SharedFileItem({
	onPress,
	sharedFile,
}: {
	onPress?: () => any;
	sharedFile: SharedFile;
}) {
	const { file } = useSharedFileInfo(sharedFile.id, sharedFile.ownerId);

	return file ? (
		<ButtonGroup variant="flat">
			<FileDetailModalButton onPress={onPress} file={file} />
			<FileDropDown file={file} isEditable={false} />
		</ButtonGroup>
	) : null;
}
