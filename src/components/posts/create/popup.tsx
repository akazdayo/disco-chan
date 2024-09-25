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
import React, { useState } from "react";

export function PopUp() {
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const handleSubmit = async () => {
		const title = document.getElementById("title") as HTMLInputElement;
		const tag = document.getElementById("tag") as HTMLInputElement;
		const isPublic = document.getElementById("is_public") as HTMLInputElement;
		const tagsArray = tag.value.split(", ");

		const response = await fetch("/api/submit", {
			method: "POST",
			body: JSON.stringify({
				id: 1,
				message: title.value,
				tags: tagsArray,
				is_public: isPublic.ariaChecked === "true",
			}),
		});

		if (response.ok) {
			setIsDialogOpen(false);
		}
	};

	return (
		<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
			<DialogTrigger asChild>
				<Button variant="outline">新しい募集を投稿する</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>募集を作成</DialogTitle>
					<DialogDescription>
						新しく募集を作成します。
						<br />
						必要事項を入力し、投稿ボタンを押してください。
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					{/* タイトル */}
					<div className="grid items-center gap-4">
						<Input id="title" placeholder="タイトル" className="col-span-3" />
					</div>

					{/* タグ */}
					<div className="grid items-center gap-4">
						<Input id="tag" placeholder="タグ 5つまで" className="col-span-3" />
					</div>

					{/* 公開設定 */}
					<div className="flex items-top space-x-2">
						<Checkbox id="is_public" />
						<div className="grid gap-1.5 leading-none">
							<Label
								htmlFor="is_public"
								className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							>
								全体公開
							</Label>
							<p className="text-sm text-muted-foreground">
								全体に公開される募集です。世界中の誰でも参加できます。
							</p>
						</div>
					</div>
				</div>
				<DialogFooter>
					<Button type="submit" onClick={handleSubmit}>
						投稿
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
