import FONT from "@/constants/fontFamily";
import { IoGlobeOutline, IoLockClosedOutline } from "react-icons/io5";
import { twMerge } from "tailwind-merge";

export default function PrivacyStatus({ isPublic }: { isPublic?: boolean }) {
	return (
		<div className=" flex flex-row items-center gap-2">
			<div>
				{isPublic ? (
					<IoGlobeOutline className="text-green-500" size={18} />
				) : (
					<IoLockClosedOutline className=" text-red-500" size={18} />
				)}
			</div>
			<p
				className={twMerge(
					" text-foreground-900 font-medium",
					FONT.primary.className,
					isPublic ? " text-green-500" : " text-red-500"
				)}
			>
				{isPublic ? "Public" : "Private"}
			</p>
		</div>
	);
}
