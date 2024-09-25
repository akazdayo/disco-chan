import { useState } from "react";

interface TokenResponse {
    token_type: string;
    access_token: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
    id_token: string;
}

export async function getToken(params: URLSearchParams){
    const code = params.get("code");
    if (code == null) {
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
    console.log(data);
    return data;
}