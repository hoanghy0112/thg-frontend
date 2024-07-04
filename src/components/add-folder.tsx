"use client";

import { useUser } from "@/hooks/useUser";
import { saveFolderInformation } from "@/lib/firebase/firestore";
import {
	Button,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from "@nextui-org/react";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

type Props = {
	parentFolderId?: string;
	isOpen: boolean;
	onOpenChange?: (isOpen: boolean) => void;
};

export default function AddFolder({
	parentFolderId,
	isOpen,
	onOpenChange,
}: Props) {
	const [name, setName] = useState<string>("");
	const user = useUser();

	const handleAddFolder = useCallback(() => {
		if (!user) return;
		setName("");
		const promise = saveFolderInformation({
			folderName: name,
			user,
			folderId: parentFolderId || "",
		});
		toast.promise(promise, {
			loading: "Creating folder...",
			success: "Create folder successfully",
			error: "Fail to create folder",
		});
	}, [user, parentFolderId, name]);

	return (
		<div>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1 text-foreground-900">
								Add new folder
							</ModalHeader>
							<ModalBody>
								<div>
									<Input
										value={name}
										onChange={(e) => setName(e.target.value)}
										label="Folder name"
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
										handleAddFolder();
									}}
								>
									<p className=" font-semibold"> Create</p>
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</div>
	);
}
