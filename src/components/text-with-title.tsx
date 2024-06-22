import FONT from "@/constants/fontFamily";
import React from "react";
import { twMerge } from "tailwind-merge";

type Props = {
	title: string;
	text?: string;
} & Pick<React.ComponentPropsWithoutRef<"div">, "className">;

export default function TextWithTitle({ title, text, className }: Props) {
	return (
		<div className={className}>
			<p className={twMerge(FONT.primary.className, " text-foreground-600")}>
				{title}
			</p>
			<p
				className={twMerge(
					FONT.primary.className,
					"font-semibold text-foreground-900 text-lg"
				)}
			>
				{text}
			</p>
		</div>
	);
}
