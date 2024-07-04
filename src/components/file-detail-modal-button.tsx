import FONT from "@/constants/fontFamily";
import { useUser } from "@/hooks/useUser";
import { updateFile } from "@/lib/core/manage-file";
import { getFileShareLink } from "@/lib/core/manage-share";
import { AppFile } from "@/types/AppFile";
import { getFileSizeString } from "@/utils/fileSize";
import { timeDiff } from "@/utils/timeDiff";
import { Button, Modal, ModalContent, useDisclosure } from "@nextui-org/react";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import {
	IoCheckmarkDoneSharp,
	IoDocument,
	IoLockClosedOutline,
	IoShareSocialOutline,
} from "react-icons/io5";
import { twMerge } from "tailwind-merge";
import FileDropDown from "./file-dropdown";
import PrivacyStatus from "./privacy-status";

export default function FileDetailModalButton({
	file,
	onPress,
}: {
	file: AppFile;
	onPress?: () => any;
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

	const user = useUser();

	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const [isCopied, setIsCopied] = useState(false);

	return (
		<>
			<Button
				onPress={onPress || onOpen}
				className={twMerge(
					" w-full bg-foreground-100 cursor-pointer hover:bg-foreground-200 transition-all duration-200"
				)}
			>
				<div className=" w-full flex flex-row items-center gap-3 ">
					<div>
						<IoDocument className=" text-foreground-900" size={18} />
					</div>
					<p className=" text-start flex-1 font-medium text-sm text-foreground-900">
						{name}
					</p>
				</div>
			</Button>
			<Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					<div className=" p-4 w-full flex flex-col">
						{type.split("/").at(0) === "image" ? (
							<Image
								className=" rounded-xl overflow-hidden w-full h-[150px] object-cover"
								src={location}
								alt="preview image"
								width={400}
								height={150}
							/>
						) : null}
						<p
							className={twMerge(
								" mt-4 text-foreground-400 text-sm",
								FONT.primary.className
							)}
						>{`Created ${timeDiff(new Date(seconds * 1000)).time} ${
							timeDiff(new Date(seconds * 1000)).type
						} ago`}</p>
						<div className=" flex-1 flex flex-row justify-between gap-2">
							<p
								className={twMerge(
									" flex-1 mt-1 text-ellipsis whitespace-pre-wrap text-wrap font-semibold text-lg text-foreground-900",
									FONT.primary.className
								)}
							>
								{name}
							</p>
							<div className="">
								<FileDropDown file={file} />
							</div>
						</div>
						<p
							className={twMerge(
								" mt-2 text-foreground-600",
								FONT.primary.className
							)}
						>
							{getFileSizeString(size)}
						</p>
						<div className=" mt-5 flex flex-col gap-3">
							<PrivacyStatus isPublic={isSharable} />
							<Button
								onPress={() => {
									if (!user) {
										toast.error("User data not found");
										return;
									}
									updateFile(user, id, { isSharable: true });
									navigator.clipboard.writeText(
										getFileShareLink(id, user?.uid)
									);
									setIsCopied(true);
									setTimeout(() => {
										setIsCopied(false);
									}, 2000);
								}}
								className=" w-full"
								startContent={
									isCopied ? (
										<IoCheckmarkDoneSharp
											className=" text-green-500"
											size={18}
										/>
									) : (
										<IoShareSocialOutline size={18} />
									)
								}
							>
								<p
									className={twMerge(
										" font-semibold",
										FONT.primary.className
									)}
								>
									{isCopied ? "Copied" : "Share file"}
								</p>
							</Button>
							{isSharable ? (
								<Button
									onPress={() => {
										if (!user) {
											toast.error("User data not found");
											return;
										}
										updateFile(user, id, { isSharable: false });
									}}
									className=" w-full"
									startContent={
										<IoLockClosedOutline
											className=" text-red-500"
											size={18}
										/>
									}
								>
									<p
										className={twMerge(
											" font-semibold text-red-500",
											FONT.primary.className
										)}
									>
										Make this file private
									</p>
								</Button>
							) : null}
						</div>
					</div>
				</ModalContent>
			</Modal>
		</>
	);
}
