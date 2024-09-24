import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export function PopUp() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">新しい募集を投稿する</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>募集を作成</DialogTitle>
					<DialogDescription>
						新しく募集を作成します。必要事項を入力し、投稿ボタンを押してください。
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					{/* タイトル */}
					<div className="grid items-center gap-4">
						<Input id="title" placeholder="タイトル" className="col-span-3" />
					</div>

					{/* タグ */}
					<div className="grid items-center gap-4">
						<Input id="tag" placeholder="タグ" className="col-span-3" />
					</div>

					{/* 公開設定 */}
					<div className="flex items-top space-x-2">
						<Checkbox id="public" />
						<div className="grid gap-1.5 leading-none">
							<label
								htmlFor="public"
								className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							>
								全体公開
							</label>
							<p className="text-sm text-muted-foreground">
								全体に公開される募集です。世界中の誰でも参加できます。
							</p>
						</div>
					</div>
				</div>
				<DialogFooter>
					<Button type="submit">投稿</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
