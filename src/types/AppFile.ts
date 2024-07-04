export type AppFile = {
	id: string;
	folder: string;
	key: string;
	name: string;
	size: number;
	type: string;
	location: string;
	isSharable: boolean;
	lastAccessAt: {
		seconds: number;
		nanoseconds: number;
	};
	createdAt: {
		seconds: number;
		nanoseconds: number;
	};
	touches: {
		userId: string;
		lastAccessAt: {
			seconds: number;
			nanoseconds: number;
		};
	}[];
};
