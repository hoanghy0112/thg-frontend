export const convertFiletoBlobAndDownload = async (
	dataurl: string,
	filename: string
) => {
	const blob = await fetch(dataurl).then((r) => r.blob());
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.style.display = "none";
	a.href = url;
	a.download = filename;
	document.body.appendChild(a);
	a.click();
	window.URL.revokeObjectURL(url);
	a.remove();
};
