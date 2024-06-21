import { Be_Vietnam_Pro, Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const primary = Be_Vietnam_Pro({
	subsets: ["latin"],
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const FONT = {
	inter,
	primary,
};

export default FONT;
