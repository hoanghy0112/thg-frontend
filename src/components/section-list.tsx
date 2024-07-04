import { ReactNode } from "react";

type Props<T> = {
	data: T[];
	renderItem: (item: T, index: number) => ReactNode;
	keyExtractor: (item: T) => any;
};

export default function SectionList<T>({
	data,
	renderItem,
	keyExtractor,
}: Props<T>) {
	return <div></div>;
}
