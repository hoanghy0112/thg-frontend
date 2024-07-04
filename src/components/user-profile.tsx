import { User } from "firebase/auth";
import Image from "next/image";

export default function UserProfile({ user }: { user: User }) {
	return (
		<div className=" w-fit bg-foreground-50 rounded-xl px-4 py-3 flex flex-row gap-4 items-center">
			<div className=" rounded-full bg-foreground-300 overflow-hidden w-10 h-10">
				{user?.photoURL ? (
					<Image
						src={user?.photoURL}
						alt="User avatar"
						width={40}
						height={40}
					/>
				) : null}
			</div>
			<div className=" flex flex-col gap-1">
				<p className=" font-semibold text-foreground-900">
					{user?.displayName}
				</p>
				<p className=" text-foreground-600">{user?.email}</p>
			</div>
		</div>
	);
}
