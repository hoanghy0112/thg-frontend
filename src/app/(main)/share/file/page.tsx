"use client";

import FileDropDown from "@/components/file-dropdown";
import PrivacyStatus from "@/components/privacy-status";
import SharedFileHandler from "@/components/shared-file-handler";
import TextWithTitle from "@/components/text-with-title";
import UserProfile from "@/components/user-profile";
import FONT from "@/constants/fontFamily";
import { useSharedFileInfo } from "@/hooks/useSharedFileInfo";
import { useUserInfo } from "@/hooks/useUserInfo";
import { getFileSizeString } from "@/utils/fileSize";
import { timeDiff } from "@/utils/timeDiff";
import Image from "next/image";
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

	console.log({ file });

	return (
		<div className=" flex-1 flex">
			<div className=" flex-1 flex flex-row gap-6">
				<div className=" flex-1 flex transition-all duration-300">
					<div className=" flex-1 rounded-3xl overflow-hidden ml-2 grid grid-cols-2">
						<div className=" bg-foreground-100 py-5 px-8 flex flex-col gap-1">
							<div className=" mt-0 flex flex-col gap-3">
								<PrivacyStatus isPublic={file?.isSharable} />
							</div>
							<div className=" flex justify-between">
								<h1 className=" mt-1 text-foreground-900 font-bold text-2xl">
									{file?.name}
								</h1>
								{file ? (
									<FileDropDown file={file} isEditable={false} />
								) : null}
							</div>
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
							{/* <div>
								{file?.touches?.map((touch) => (
									<UserPreview key={touch.userId} id={touch.userId} />
								))}
							</div> */}
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
						<div className=" flex-1 flex">
							{file?.type.split("/").at(0) === "image" ? (
								<Image
									className=" flex-1 flex object-cover"
									src={file?.location}
									alt="preview image"
									width={800}
									height={800}
								/>
							) : (
								<div className=" bg-foreground-200 flex-1 flex flex-col justify-center items-center gap-2">
									<p className=" text-2xl font-semibold text-foreground-900">
										Can not display preview
									</p>
									<p className=" text-base font-medium text-foreground-600">
										We currently don&apos;t support preview this type
										of file
									</p>
								</div>
							)}
						</div>
					</div>
					<div className=" mt-8 flex flex-col gap-6"></div>
				</div>
			</div>
			{file && userId ? (
				<SharedFileHandler ownerId={userId} file={file} />
			) : null}
		</div>
	);
}
