import { useUserInfo } from "@/hooks/useUserInfo";
import Image from "next/image";

type Props = {
	id: string;
};

export default function UserPreview({ id }: Props) {
	const { user, exist } = useUserInfo(id);

	return (
		<div className=" w-[50px] h-[50px] rounded-full overflow-hidden bg-foreground-200">
			{user?.photoURL ? (
				<Image
					src={user.photoURL}
					width={50}
					height={50}
					alt="user avatar"
				/>
			) : null}
		</div>
	);
}
