import { useUser } from "@/hooks/useUser";
import { AppFile } from "@/types/AppFile";
import {
	Button,
	ButtonGroup,
	Dropdown,
	DropdownTrigger,
} from "@nextui-org/react";
import { IoEllipsisVertical } from "react-icons/io5";
import FileDetailModalButton from "./file-detail-modal-button";
import FileDropDown from "./file-dropdown";

export default function FileItem({
	onPress,
	file,
}: {
	onPress?: (id: string) => any;
	file: AppFile;
}) {
	const {
		id,
		name,
		location,
		type,
		size,
		isSharable,
		createdAt: { seconds },
	} = file;

	return (
		<ButtonGroup variant="flat">
			<FileDetailModalButton file={file} />
			<FileDropDown file={file} isEditable />
		</ButtonGroup>
	);
}
