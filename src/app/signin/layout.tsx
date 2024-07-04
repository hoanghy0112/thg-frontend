import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
	const isSignin = cookies().get("isSignin");

	if (isSignin) {
		redirect("/home");
	}

	return children;
}
