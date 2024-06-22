import FONT from "@/constants/fontFamily";
import { AppFile } from "@/types/AppFile";
import { Folder } from "@/types/Folder";
import { getFileSizeString } from "@/utils/fileSize";
import { timeDiff } from "@/utils/timeDiff";
import {
	Button,
	ButtonGroup,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
	IoEllipsisVertical,
	IoDocument,
	IoCloudDownloadSharp,
	IoCloudDownloadOutline,
	IoTrashBinOutline,
	IoShareSocialOutline,
} from "react-icons/io5";
import { twMerge } from "tailwind-merge";

export default function FileItem({
	onPress,
	file: {
		id,
		name,
		location,
		type,
		size,
		createdAt: { seconds },
	},
}: {
	onPress?: (id: string) => any;
	file: AppFile;
}) {
	const [isCopied, setIsCopied] = useState(false);

	function download(dataurl: string, filename: string) {
		const link = document.createElement("a");
		link.href = dataurl;
		link.download = filename;
		link.click();
	}

	useEffect(() => {
		if (isCopied) {
			const timeoutId = setTimeout(() => {
				setIsCopied(false);
			}, 1000);

			return clearTimeout(timeoutId);
		}
	}, [isCopied]);

	return (
		<ButtonGroup variant="flat">
			<Popover backdrop="blur">
				<PopoverTrigger>
					<Button
						// onPress={() => onPress?.(id)}
						className={twMerge(
							" w-full bg-foreground-100 cursor-pointer hover:bg-foreground-200 duration-200"
						)}
					>
						<div className=" w-full flex flex-row items-center gap-3 ">
							<div>
								<IoDocument
									className=" text-foreground-900"
									size={18}
								/>
							</div>
							<p className=" text-start flex-1 font-medium text-sm text-foreground-900">
								{name}
							</p>
						</div>
					</Button>
				</PopoverTrigger>
				<PopoverContent>
					<div className=" p-4">
						<p
							className={twMerge(
								" text-foreground-500",
								FONT.primary.className
							)}
						>{`Created ${timeDiff(new Date(seconds * 1000)).time} ${
							timeDiff(new Date(seconds * 1000)).type
						} ago`}</p>
						<p
							className={twMerge(
								" mt-2 font-semibold text-lg text-foreground-900",
								FONT.primary.className
							)}
						>
							{name}
						</p>
						<p
							className={twMerge(
								" mt-1 text-foreground-600",
								FONT.primary.className
							)}
						>
							{getFileSizeString(size)}
						</p>
						<div className=" mt-5">
							<Button
								onPress={() => {
									setIsCopied(true);
								}}
								className=" w-full"
								startContent={<IoShareSocialOutline size={18} />}
							>
								<p>Share file</p>
							</Button>
						</div>
					</div>
				</PopoverContent>
			</Popover>
			<Dropdown placement="bottom-end">
				<DropdownTrigger>
					<Button
						isIconOnly
						className=" bg-foreground-100 hover:bg-foreground-200"
					>
						<IoEllipsisVertical size={15} />
					</Button>
				</DropdownTrigger>
				<DropdownMenu aria-label="Static Actions">
					<DropdownItem
						key="Download"
						className=" text-foreground-900"
						startContent={<IoCloudDownloadOutline size={18} />}
						onPress={() => {
							download(location, name);
						}}
					>
						<p
							className={twMerge(" font-medium", FONT.primary.className)}
						>
							Download
						</p>
					</DropdownItem>
					<DropdownItem
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
		</ButtonGroup>
	);
}
