import { Sidebar } from "@/components/side-bar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const isSignin = cookies().get("isSignin");

	if (!isSignin) {
		redirect("/signin");
	}

	return (
		<div className=" w-screen h-screen flex bg-background">
			<Sidebar />
			<div className=" flex-1 flex px-4 py-8 overflow-auto"> {children}</div>
		</div>
	);
}
