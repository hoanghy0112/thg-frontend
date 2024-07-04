import { Button } from "@nextui-org/react";
import { IoChevronBackSharp } from "react-icons/io5";

export default function BackButton({ onPress }: { onPress?: () => any }) {
	return (
		<Button size="sm" onPress={onPress} startContent={<IoChevronBackSharp />}>
			<p className=" font-semibold"> Back</p>
		</Button>
	);
}
