export type SharedFile = {
	id: string;
	ownerId: string;
	lastAccessAt: {
		seconds: number;
		nanoseconds: number;
	};
};
