"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Switch } from "@nextui-org/switch";

import { MoonIcon } from "@/assets/moon-icon";
import { SunIcon } from "@/assets/sun-icon";

export default function ThemeSwitcher(props: {}) {
	const { theme, setTheme } = useTheme();

	const [mounted, setMounted] = useState<Boolean>(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	return (
		mounted && (
			<Switch
				isSelected={theme == "light"}
				onValueChange={() =>
					theme == "light" ? setTheme("dark") : setTheme("light")
				}
				defaultSelected
				size="md"
				color="primary"
				startContent={<SunIcon />}
				endContent={<MoonIcon />}
			/>
		)
	);
}
