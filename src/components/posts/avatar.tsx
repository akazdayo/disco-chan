import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import type { UserProfile } from "@/lib/prisma";

export function GetAvatar({
	user,
	profile,
}: { user: number; profile: UserProfile | null }) {
	return (
		<Avatar className="w-10 h-10 border">
			<AvatarImage
				src={`https://cdn.discordapp.com/avatars/${user}/${profile?.avatar}`}
				alt="User Avatar"
			/>
			<AvatarFallback>TEST</AvatarFallback>
		</Avatar>
	);
}
