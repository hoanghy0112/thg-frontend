export function joinFolder(folder: string[]) {
	return encodeURIComponent(folder.join("/"));
}
