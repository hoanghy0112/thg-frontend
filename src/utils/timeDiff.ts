import moment from "moment";

export function timeDiff(date: Date) {
	if (Math.abs(moment().diff(date, "minutes")) < 60) {
		return {
			time: moment().diff(date, "minutes"),
			type: "minutes",
			abbr: "m",
		};
	}

	if (Math.abs(moment().diff(date, "hours")) < 24) {
		return { time: moment().diff(date, "hours"), type: "hours", abbr: "h" };
	}

	if (Math.abs(moment().diff(date, "days")) < 60) {
		return { time: moment().diff(date, "days"), type: "days", abbr: "d" };
	}

	return { time: moment().diff(date, "month"), type: "months", abbr: "M" };
}
