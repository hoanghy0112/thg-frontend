import { useUser } from "@/hooks/useUser";
import { uploadFile } from "@/lib/core/uploadFile";
import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	useDisclosure,
} from "@nextui-org/react";
import { ChangeEventHandler, useCallback, useRef, useState } from "react";
import toast from "react-hot-toast";
import {
	IoCloudUploadOutline,
	IoDocumentText,
	IoFolderOpen,
} from "react-icons/io5";
import AddFolder from "./add-folder";

export default function FolderFileUpload({ folderId }: { folderId: string }) {
	const user = useUser();

	const [files, setFiles] = useState<File[]>([]);

	const inputRef = useRef<HTMLInputElement>(null);

	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const handleAddFile = useCallback(() => {
		inputRef?.current?.click();
	}, [inputRef]);

	const handleFilesChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
		(event) => {
			if (!event.target.files) return;

			const files: File[] = [];
			const fileList = event.target.files;
			for (let i = 0; i < fileList.length; i++) {
				const file = fileList.item(i);
				if (file) files.push(file);
			}

			setFiles(files);

			if (!user) {
				toast.error("Can not find user profile", {
					position: "top-center",
				});
				return;
			}

			files.forEach((file) => {
				toast.promise(uploadFile(file, folderId, user), {
					loading: (
						<p>
							Uploading{" "}
							<span className=" font-semibold">{file.name}</span>
						</p>
					),
					success: (
						<p>
							Upload <span className=" font-semibold">{file.name}</span>{" "}
							successfully
						</p>
					),
					error: (
						<div>
							<p>
								Fail to upload file{" "}
								<span className=" font-semibold">{file.name}</span>
							</p>
						</div>
					),
				});
			});
		},
		[folderId, user]
	);

	return (
		<div>
			<input
				ref={inputRef}
				name="file"
				type="file"
				multiple
				className=" hidden"
				onChange={handleFilesChange}
			/>
			<Dropdown placement="bottom-start" backdrop="blur">
				<DropdownTrigger>
					<Button type="submit" className=" w-full bg-primary-200">
						<div className=" w-full flex gap-3 items-center justify-start">
							<IoCloudUploadOutline size={24} />
							<p className=" font-semibold">Upload</p>
						</div>
					</Button>
				</DropdownTrigger>
				<DropdownMenu aria-label="Static Actions">
					<DropdownItem
						onPress={handleAddFile}
						key="new-file"
						startContent={
							<IoDocumentText
								className=" text-foreground-900"
								size={20}
							/>
						}
					>
						<p className=" text-foreground-900 font-semibold">New file</p>
					</DropdownItem>
					<DropdownItem
						onPress={onOpen}
						key="new-folder"
						startContent={
							<IoFolderOpen className=" text-foreground-900" size={20} />
						}
					>
						<p className=" text-foreground-900 font-semibold">
							New folder
						</p>
					</DropdownItem>
				</DropdownMenu>
			</Dropdown>
			<AddFolder
				parentFolderId={folderId}
				isOpen={isOpen}
				onOpenChange={onOpenChange}
			/>
		</div>
	);
}
