import FONT from "@/constants/fontFamily";
import { useUser } from "@/hooks/useUser";
import { updateFile } from "@/lib/core/manage-file";
import { removeFile } from "@/lib/firebase/firestore";
import { AppFile } from "@/types/AppFile";
import { convertFiletoBlobAndDownload } from "@/utils/downloadFile";
import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure,
} from "@nextui-org/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import {
	IoCloudDownloadOutline,
	IoEllipsisVertical,
	IoPencil,
	IoTrashBinOutline,
} from "react-icons/io5";
import { twMerge } from "tailwind-merge";

type Props = {
	file: AppFile;
	isEditable?: boolean;
};

export default function FileDropDown({ file, isEditable }: Props) {
	const filename = useMemo(
		() =>
			file.name
				.split(".")
				.slice(0, file.name.split(".").length - 1)
				.join("."),
		[file.name]
	);
	const ext = useMemo(() => file.name.split(".").at(-1), [file.name]);

	const [name, setName] = useState<string>(filename);
	const user = useUser();

	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const handleRename = useCallback(() => {
		if (!user) return;
		const promise = updateFile(user, file.id, { name: `${name}.${ext}` });
		toast.promise(promise, {
			loading: "Updating file name...",
			success: "Updating file name successfully",
			error: "Fail to update file name",
		});
		setName(filename);
	}, [user, file.id, filename, name, ext]);

	useEffect(() => {
		setName(filename);
	}, [filename]);

	return (
		<>
			<Dropdown placement="bottom-end">
				<DropdownTrigger>
					<Button
						isIconOnly
						className=" bg-foreground-100 hover:bg-foreground-200"
					>
						<IoEllipsisVertical size={15} />
					</Button>
				</DropdownTrigger>
				<DropdownMenu aria-label="File drop down">
					<DropdownItem
						key="Download"
						className=" text-foreground-900"
						startContent={<IoCloudDownloadOutline size={18} />}
						onPress={() => {
							convertFiletoBlobAndDownload(file.location, file.name);
						}}
					>
						<p
							className={twMerge(" font-medium", FONT.primary.className)}
						>
							Download
						</p>
					</DropdownItem>
					<DropdownItem
						key="rename"
						isReadOnly={!isEditable}
						style={{ display: isEditable ? "flex" : "none" }}
						onPress={() => {
							onOpen();
						}}
						className=" text-foreground-900"
						startContent={<IoPencil size={18} />}
					>
						<p
							className={twMerge(" font-medium", FONT.primary.className)}
						>
							Rename
						</p>
					</DropdownItem>
					<DropdownItem
						isReadOnly={!isEditable}
						style={{ display: isEditable ? "flex" : "none" }}
						onPress={() => {
							if (!user) {
								toast.error("User data not found");
								return;
							}
							const promise = removeFile(file.id, user);
							toast.promise(promise, {
								loading: "Removing folder...",
								success: "Remove folder successfully",
								error: "Fail to remove folder",
							});
						}}
						key="delete"
						className=" text-danger-500"
						color="danger"
						startContent={<IoTrashBinOutline size={18} />}
					>
						<p
							className={twMerge(" font-medium", FONT.primary.className)}
						>
							Delete
						</p>
					</DropdownItem>
				</DropdownMenu>
			</Dropdown>
			<Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1 text-foreground-900">
								Update file name
							</ModalHeader>
							<ModalBody>
								<div>
									<Input
										value={name}
										onChange={(e) => setName(e.target.value)}
										label="File name"
										labelPlacement="inside"
									/>
								</div>
							</ModalBody>
							<ModalFooter>
								<Button
									color="danger"
									variant="light"
									onPress={onClose}
								>
									Close
								</Button>
								<Button
									color="primary"
									onPress={() => {
										onClose();
										handleRename();
									}}
								>
									<p className=" font-semibold">Update</p>
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
