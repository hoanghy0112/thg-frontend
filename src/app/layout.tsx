import { NextUIProvider } from "@nextui-org/react";
import type { Metadata } from "next";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "THG File Manager",
	description: "File Manager app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<NextUIProvider>
					<NextThemesProvider attribute="class" defaultTheme="dark">
						{children}
					</NextThemesProvider>
				</NextUIProvider>
			</body>
		</html>
	);
}
