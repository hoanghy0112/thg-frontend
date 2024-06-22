import FONT from "@/constants/fontFamily";
import { twMerge } from "tailwind-merge";

export default function Page() {
	return (
		<div className=" flex-1 flex flex-col gap-2 items-center justify-center">
			<p
				className={twMerge(
					" font-bold text-xl text-foreground-900",
					FONT.primary.className
				)}
			>
				File can not be found
			</p>
			<p className={twMerge(" text-foreground-600", FONT.primary.className)}>
				Please make sure this link is not broken and the owner of this file
				allow you to access
			</p>
		</div>
	);
}
