import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function Picker({ postid }: { postid: number }) {
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
				<p className="bg-muted rounded-full px-3 py-1 text-xs text-muted-foreground cursor-pointer">
					+
				</p>
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
