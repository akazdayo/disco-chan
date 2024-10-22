import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

export function Picker() {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="outline">+</Button>
			</PopoverTrigger>
			<PopoverContent className="">
				<div className="flex gap-4">
					<Button>
						<span aria-label="emoji">👍</span>
					</Button>
					<Button>
						<span aria-label="emoji">👎</span>
					</Button>
					<Button>
						<span aria-label="emoji">❤️</span>
					</Button>
					<Button>
						<span aria-label="emoji">🎉</span>
					</Button>
				</div>
			</PopoverContent>
		</Popover>
	);
}
