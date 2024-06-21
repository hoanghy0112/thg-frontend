import FONT from "@/constants/fontFamily";
import { twMerge } from "tailwind-merge";
import { SidebarItem } from "./side-bar-item";
import ThemeSwitcher from "./theme-switcher";

export function Sidebar() {
	const PAGES = [
		{ name: "home", title: "Home page" },
		{ name: "shared", title: "Shared files" },
	];

	return (
		<div className=" px-6 py-8 bg-foreground-50">
			<div className=" flex justify-between">
				<h1
					className={twMerge(
						FONT.primary.className,
						" font-bold text-2xl text-foreground-900"
					)}
				>
					THG
				</h1>
				<ThemeSwitcher />
			</div>
			<div className=" mt-8 flex flex-col gap-4">
				{PAGES.map(({ name, title }) => (
					<SidebarItem key={name} name={name} title={title} />
				))}
			</div>
		</div>
	);
}
