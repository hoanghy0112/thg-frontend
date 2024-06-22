import FONT from "@/constants/fontFamily";
import { ComponentPropsWithoutRef, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export default function TitleText({
	children,
	className,
}: { children: ReactNode } & Pick<ComponentPropsWithoutRef<"p">, "className">) {
	return (
		<p
			className={twMerge(
				" font-bold text-lg text-foreground-900",
				className,
				FONT.primary.className
			)}
		>
			{children}
		</p>
	);
}
