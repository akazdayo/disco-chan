/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/VXxubzI7vI2
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

/** Add fonts into your Next.js project:

import { Inter } from 'next/font/google'

inter({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export function Post(props: { message: string }) {
	return (
		<div className="flex items-center justify-center m-2 bg-background">
			<div className="bg-card rounded-lg shadow-lg w-full max-w-md p-6">
				<div className="flex items-start gap-4">
					<Avatar className="w-10 h-10 border">
						<AvatarImage src="/placeholder-user.jpg" alt="User Avatar" />
						<AvatarFallback>YS</AvatarFallback>
					</Avatar>
					<div className="grid gap-1 flex-1">
						<div className="flex items-center gap-2">
							<div className="font-medium">Yuki Sato</div>
							<div className="text-xs text-muted-foreground">2 hours ago</div>
						</div>
						<div className="text-sm prose">
							<p>{props.message}</p>
						</div>
						<div className="flex gap-2">
							<div className="bg-muted rounded-full px-3 py-1 text-xs text-muted-foreground">
								League of Legends
							</div>
							<div className="bg-muted rounded-full px-3 py-1 text-xs text-muted-foreground">
								雑談
							</div>
							<div className="bg-muted rounded-full px-3 py-1 text-xs text-muted-foreground">
								楽しく
							</div>
						</div>
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
					</div>
				</div>
			</div>
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
			<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
		</svg>
	);
}
