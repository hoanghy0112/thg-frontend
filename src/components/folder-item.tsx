import { Folder } from "@/types/Folder";
import {
	Dropdown,
	DropdownTrigger,
	Button,
	DropdownMenu,
	DropdownItem,
} from "@nextui-org/react";
import { IoEllipsisVertical, IoFolderOpenOutline } from "react-icons/io5";
import { twMerge } from "tailwind-merge";

export default function FolderItem({
	folder: { id, color, icon, name },
}: {
	folder: Folder;
}) {
	return (
		<Button
			className={twMerge(
				" w-full min-w-52 px-3 py-1 rounded-lg flex flex-row items-center gap-3 bg-foreground-100 cursor-pointer hover:bg-foreground-200 duration-200"
			)}
			style={color ? { backgroundColor: color } : {}}
		>
			<div>
				{icon !== "default" ? (
					icon
				) : (
					<IoFolderOpenOutline
						className=" text-foreground-900"
						size={18}
					/>
				)}
			</div>
			<p className=" text-start flex-1 font-medium text-sm text-foreground-900">
				{name}
			</p>
			<Dropdown>
				<DropdownTrigger>
					<Button isIconOnly variant="light" size="sm">
						<IoEllipsisVertical size={15} />
					</Button>
				</DropdownTrigger>
				<DropdownMenu aria-label="Static Actions">
					<DropdownItem
						key="delete"
						className=" text-danger-500"
						color="danger"
					>
						<p className=" font-medium"> Delete</p>
					</DropdownItem>
				</DropdownMenu>
			</Dropdown>
		</Button>
	);
}
