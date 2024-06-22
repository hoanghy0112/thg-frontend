import FONT from "@/constants/fontFamily";
import { AppFile } from "@/types/AppFile";
import { Folder } from "@/types/Folder";
import {
	Button,
	ButtonGroup,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from "@nextui-org/react";
import {
	IoEllipsisVertical,
	IoDocument,
	IoCloudDownloadSharp,
	IoCloudDownloadOutline,
	IoTrashBinOutline,
} from "react-icons/io5";
import { twMerge } from "tailwind-merge";

export default function FileItem({
	onPress,
	file: { id, name, location, type, size },
}: {
	onPress?: (id: string) => any;
	file: AppFile;
}) {
	function download(dataurl: string, filename: string) {
		const link = document.createElement("a");
		link.href = dataurl;
		link.download = filename;
		link.click();
	}

	return (
		<ButtonGroup variant="flat">
			<Button
				onPress={() => onPress?.(id)}
				className={twMerge(
					" w-full bg-foreground-100 cursor-pointer hover:bg-foreground-200 duration-200"
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
