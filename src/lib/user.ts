export async function GetUserID(access_token: string): Promise<number> {
    const response = await fetch("https://discordapp.com/api/users/@me", {
        headers: {
            "Authorization": `Bearer ${access_token}`
        }
    });
    const profile = await response.json();
    return profile.id;
}