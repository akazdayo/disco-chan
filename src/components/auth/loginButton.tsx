import { Button } from "@/components/ui/button";

export function LoginButton() {
	return (
		<div className="flex items-end justify-end">
			<Button className="m-5 text-white" onClick={handleLogin}>
				Discordでログイン
			</Button>
		</div>
	);
}

function handleLogin() {
	console.log("login");

	// 必要スコープ: identify, openid
	window.location.href = import.meta.env.PUBLIC_DISCORD_OAUTH_URL;
}
