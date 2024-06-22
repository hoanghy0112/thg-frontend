export type Folder = {
	id: string;
	folder: string;
	color: string;
	icon: string;
	name: string;
	createdAt: {
		seconds: number;
		nanoseconds: number;
	};
};
