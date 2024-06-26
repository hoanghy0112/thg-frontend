import FONT from "@/constants/fontFamily";
import { useUser } from "@/hooks/useUser";
import { removeFile } from "@/lib/firebase/firestore";
import { AppFile } from "@/types/AppFile";
import { convertFiletoBlobAndDownload } from "@/utils/downloadFile";
import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from "@nextui-org/react";
import toast from "react-hot-toast";
import {
	IoCloudDownloadOutline,
	IoEllipsisVertical,
	IoTrashBinOutline,
} from "react-icons/io5";
import { twMerge } from "tailwind-merge";

type Props = {
	file: AppFile;
};

export default function FileDropDown({ file }: Props) {
	const user = useUser();

	return (
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
					<p className={twMerge(" font-medium", FONT.primary.className)}>
						Download
					</p>
				</DropdownItem>
				<DropdownItem
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
					<p className={twMerge(" font-medium", FONT.primary.className)}>
						Delete
					</p>
				</DropdownItem>
			</DropdownMenu>
		</Dropdown>
	);
}
