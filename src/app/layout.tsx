import { Sidebar } from "@/components/side-bar";
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
						<div className=" w-screen h-screen flex bg-background">
							<Sidebar />
							<div className=" flex-1 px-4 py-8 overflow-auto"> {children}</div>
						</div>
					</NextThemesProvider>
				</NextUIProvider>
			</body>
		</html>
	);
}
