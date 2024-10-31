import { Button } from "@/components/ui/button";

const loggedin = (
	<div className="flex items-end justify-end">
		<Button className="m-5 text-white" onClick={handleLogout}>
			ログアウト
		</Button>
	</div>
);

const loggedout = (
	<div className="flex items-end justify-end">
		<Button className="m-5 text-white" onClick={handleLogin}>
			Discordでログイン
		</Button>
	</div>
);

export function LoginButton() {
	const isLogin = document.cookie
		.split("; ")
		.some((cookie) => cookie.startsWith("is_login="));

	if (isLogin) {
		return loggedin;
	}
	return loggedout;
}

function handleLogin() {
	console.log("login");

	// 必要スコープ: identify, openid
	window.location.href = import.meta.env.PUBLIC_DISCORD_OAUTH_URL;
}

async function handleLogout() {
	await fetch("/api/logout", {
		method: "POST",
		credentials: "same-origin",
	});
	window.location.reload();
}
