export const prerender = false; // 事前レンダリングを無効化
import type { APIRoute } from "astro";
import { GetSession } from "@/lib/prisma";
import { UpdateReactions } from "@/lib/prisma";
import { GetUserID } from "@/lib/user";
import { parse } from "cookie";



export const POST: APIRoute = async ({ request }) => {
    const cookies = parse(request.headers.get('cookie') || '');
    const { emoji, postid } = await request.json();
    if (!cookies.token || !emoji) {
        throw new Error("Invalid request");
    }

    const accessToken = await GetSession(cookies.token);
    if (!accessToken) {
        throw new Error("Invalid session");
    }

    const userid = await GetUserID(accessToken);

    await UpdateReactions(postid, emoji, userid);
    return new Response("OK", { status: 200 });
}