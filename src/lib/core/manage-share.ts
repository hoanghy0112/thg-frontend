export function getFileShareLink(fileId: string, userId: string) {
	const origin = window.location.origin;

	return `${origin}/share/file?fileId=${encodeURIComponent(
		fileId
	)}&userId=${encodeURIComponent(userId)}`;
}
