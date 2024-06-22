"use client";

import PrivacyStatus from "@/components/privacy-status";
import TextWithTitle from "@/components/text-with-title";
import UserProfile from "@/components/user-profile";
import FONT from "@/constants/fontFamily";
import { useSharedFileInfo } from "@/hooks/useSharedFileInfo";
import { useUserInfo } from "@/hooks/useUserInfo";
import { getFileSizeString } from "@/utils/fileSize";
import { timeDiff } from "@/utils/timeDiff";
import { notFound, useRouter, useSearchParams } from "next/navigation";
import { twMerge } from "tailwind-merge";

export default function Page() {
	const searchParams = useSearchParams();

	const fileId = searchParams.get("fileId");
	const userId = searchParams.get("userId");

	const { user, exist: userExist } = useUserInfo(userId || "");
	const { file, exist: fileExist } = useSharedFileInfo(
		fileId || "",
		userId || ""
	);

	const router = useRouter();

	if (
		userExist === false ||
		fileExist === false ||
		file?.isSharable === false
	) {
		return notFound();
	}

	return (
		<div className=" flex-1">
			<div className=" mt-6 flex flex-row gap-6">
				<div className=" mt-2 flex-1 transition-all duration-300">
					<div className=" ml-2 flex flex-row justify-between">
						<div className="flex flex-col gap-1">
							<div className=" mt-0 flex flex-col gap-3">
								<PrivacyStatus isPublic={file?.isSharable} />
							</div>
							<h1 className=" mt-1 text-foreground-900 font-bold text-2xl">
								{file?.name}
							</h1>
							<p
								className={twMerge(
									" mt-1 text-foreground-500",
									FONT.primary.className
								)}
							>{`Created ${
								timeDiff(
									new Date((file?.createdAt.seconds || 0) * 1000)
								).time
							} ${
								timeDiff(
									new Date((file?.createdAt.seconds || 0) * 1000)
								).type
							} ago`}</p>
							<div className=" mt-4">
								{user ? <UserProfile user={user} /> : null}
							</div>
							<TextWithTitle
								className=" mt-4"
								title="File type"
								text={file?.type}
							/>
							<TextWithTitle
								className=" mt-4"
								title="File size"
								text={getFileSizeString(file?.size || 0)?.toString()}
							/>
						</div>
					</div>
					<div className=" mt-8 flex flex-col gap-6"></div>
				</div>
			</div>
		</div>
	);
}
