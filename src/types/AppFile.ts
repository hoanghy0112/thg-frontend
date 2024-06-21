export type AppFile = {
	folder: string;
	key: string;
	name: string;
	size: number;
	type: string;
	location: string;
	createdAt: {
		seconds: number;
		nanoseconds: number;
	};
};
