import { Button } from "@/components/ui/button";

export function Reaction() {
	return (
		<div className="flex items-center gap-28">
			<Button variant="ghost" size="icon">
				<MapPinIcon className="w-4 h-4" />
				<span className="sr-only">Like</span>
			</Button>
			<Button variant="ghost" size="icon">
				<CalendarIcon className="w-4 h-4" />
				<span className="sr-only">Retweet</span>
			</Button>
			<Button variant="ghost" size="icon">
				<MessageCircleIcon className="w-4 h-4" />
				<span className="sr-only">Share</span>
			</Button>
		</div>
	);
}

function CalendarIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<title>Calendar</title>
			<path d="M8 2v4" />
			<path d="M16 2v4" />
			<rect width="18" height="18" x="3" y="4" rx="2" />
			<path d="M3 10h18" />
		</svg>
	);
}

function MapPinIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<title>MapPinIcon</title>
			<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
			<circle cx="12" cy="10" r="3" />
		</svg>
	);
}

function MessageCircleIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<title>MessageIcon</title>
			<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
		</svg>
	);
}
