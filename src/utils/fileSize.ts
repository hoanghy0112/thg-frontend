export function getFileSizeString(size: number) {
	if (size < 1000) {
		return `${size} B`;
	}
	if (size < 1024 * 1024) {
		return `${(size / 1024).toFixed(1)} KB`;
	}
	if (size < 1024 * 1024 * 1024) {
		return `${(size / 1024 / 1024).toFixed(1)} MB`;
	}
}
