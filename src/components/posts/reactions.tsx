import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

export function Picker({ postid }: { postid: string }) {
	const allEmojis = ["👍", "👎", "❤️", "🎉"]; // これ以外を弾くようにしないと、脆弱性につながっちゃいそう

	const onReactionClick = async (emoji: string) => {
		// apiを叩く
		const response = await fetch("/api/addreaction", {
			method: "POST",
			body: JSON.stringify({
				emoji: emoji,
				postid: postid.toString(),
			}),
		});
	};

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="outline">+</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto">
				<div className="flex gap-4">
					{allEmojis.map((emoji) => (
						<Button key={emoji} onClick={() => onReactionClick(emoji)}>
							<span aria-label="emoji">{emoji}</span>
						</Button>
					))}
				</div>
			</PopoverContent>
		</Popover>
	);
}
