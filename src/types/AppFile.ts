export type AppFile = {
	id: string;
	folder: string;
	key: string;
	name: string;
	size: number;
	type: string;
	location: string;
	isSharable: boolean;
	createdAt: {
		seconds: number;
		nanoseconds: number;
	};
};
