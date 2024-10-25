// get a discord UserID from an access token
export async function GetUserID(access_token: string): Promise<number> {
    // request to discord api
    const response = await fetch("https://discordapp.com/api/users/@me", {
        headers: {
            "Authorization": `Bearer ${access_token}`
        }
    });
    const profile = await response.json();
    
    // return discord userID
    return profile.id;
}