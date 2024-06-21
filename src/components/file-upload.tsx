import { useUser } from "@/hooks/useUser";
import { uploadFile } from "@/lib/core/uploadFile";
import { Button } from "@nextui-org/react";
import { ChangeEventHandler, useCallback, useRef, useState } from "react";
import toast from "react-hot-toast";
import { IoAddOutline } from "react-icons/io5";

export default function FileUpload() {
	const user = useUser();

	const [files, setFiles] = useState<File[]>([]);

	const inputRef = useRef<HTMLInputElement>(null);

	const handleAddFile = useCallback(() => {
		inputRef?.current?.click();
	}, [inputRef]);

	const handleFilesChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
		(event) => {
			if (!event.target.files) return;

			const files: File[] = [];
			const fileList = event.target.files;
			for (let i = 0; i < fileList.length; i++) {
				const file = fileList.item(i);
				if (file) files.push(file);
			}

			setFiles(files);

			if (!user) {
				toast.error("Can not find user profile", {
					position: "top-center",
				});
				return;
			}

			files.forEach((file) => {
				toast.promise(uploadFile(file, [], user), {
					loading: (
						<p>
							Uploading{" "}
							<span className=" font-semibold">{file.name}</span>
						</p>
					),
					success: (
						<p>
							Upload <span className=" font-semibold">{file.name}</span>{" "}
							successfully
						</p>
					),
					error: (
						<div>
							<p>
								Fail to upload file{" "}
								<span className=" font-semibold">{file.name}</span>
							</p>
						</div>
					),
				});
			});
		},
		[user]
	);

	return (
		<div>
			<input
				ref={inputRef}
				name="file"
				type="file"
				multiple
				className=" hidden"
				onChange={handleFilesChange}
			/>
			<Button
				onPress={handleAddFile}
				type="submit"
				className=" w-full bg-primary-200"
			>
				<div className=" w-full flex gap-2 items-center justify-start">
					<IoAddOutline size={26} />
					<p className=" font-semibold">Add file</p>
				</div>
			</Button>
		</div>
	);
}
