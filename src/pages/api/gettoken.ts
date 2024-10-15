import type { APIRoute } from "astro";
import { UploadProfile, CreateSession } from "@/lib/prisma";
import type { TokenResponse } from "@/lib/prisma";

export const POST: APIRoute = async ({ request }) => {
    const { code } = await request.json();

    if (!code) {
        throw new Error("ログイン失敗");
    }

    // 参考にした記事: https://qiita.com/masayoshi4649/items/46fdb744cb8255f5eb98
    const response = await fetch("https://discordapp.com/api/oauth2/token",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                client_id: import.meta.env.DISCORD_CLIENT_ID,
                client_secret: import.meta.env.DISCORD_CLIENT_SECRET,
                grant_type: "authorization_code",
                code: code,
                redirect_uri: import.meta.env.DISCORD_REDIRECT_URL,
            })
        }
    );

    if (!response.ok) {
        const errorText = await response.text();
        console.error(`Error: ${response.status} - ${errorText}`);
        throw new Error("トークン取得失敗");
    }

    const data: TokenResponse = await response.json();
    const profile_id = await getProfile(data.access_token);
    const sessionid = await CreateSession(data, profile_id);



    return new Response(JSON.stringify({ "session": sessionid, "max_age": data.expires_in }), { status: 200, headers: { "Content-Type": "application/json" } });
};

async function getProfile(token: string) {
    const response = await fetch("https://discordapp.com/api/users/@me", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    const profile = await response.json();
    UploadProfile(profile.id, profile.username, profile.avatar);

    return profile.id;
}