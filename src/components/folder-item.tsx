import FONT from "@/constants/fontFamily";
import { useUser } from "@/hooks/useUser";
import { removeFolder } from "@/lib/firebase/firestore";
import { Folder } from "@/types/Folder";
import {
	Button,
	ButtonGroup,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from "@nextui-org/react";
import toast from "react-hot-toast";
import { IoEllipsisVertical, IoFolderOpenOutline } from "react-icons/io5";
import { twMerge } from "tailwind-merge";

export default function FolderItem({
	onPress,
	folder: { id, color, icon, name },
}: {
	onPress?: (id: string) => any;
	folder: Folder;
}) {
	const user = useUser();

	return (
		<ButtonGroup variant="flat">
			<Button
				onPress={() => onPress?.(id)}
				className={twMerge(
					" w-full bg-foreground-100 cursor-pointer hover:bg-foreground-200 duration-200"
				)}
				style={color ? { backgroundColor: color } : {}}
			>
				<div className=" w-full flex flex-row items-center gap-3 ">
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
					<p
						className={twMerge(
							" text-start flex-1 font-medium text-sm text-foreground-900",
							FONT.primary.className
						)}
					>
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
						onPress={() => {
							if (!user) {
								toast.error("User data not found");
								return;
							}
							const promise = removeFolder(id, user);
							toast.promise(promise, {
								loading: "Removing folder...",
								success: "Remove folder successfully",
								error: "Fail to remove folder",
							});
						}}
						key="delete"
						className=" text-danger-500"
						color="danger"
					>
						<p className=" font-medium"> Delete</p>
					</DropdownItem>
				</DropdownMenu>
			</Dropdown>
		</ButtonGroup>
	);
}
