export const prerender = false; // 事前レンダリングを無効化
import type { APIRoute } from "astro";
import { GetSession } from "@/lib/prisma";
import { UpdateReactions } from "@/lib/prisma";
import { GetUserID } from "@/lib/user";


export const POST: APIRoute = async ({ request }) => {
    const { session, emoji, postid } = await request.json();
    if (!session || !emoji) {
        throw new Error("Invalid request");
    }

    const accessToken = await GetSession(session);
    if (!accessToken) {
        throw new Error("Invalid session");
    }

    const userid = await GetUserID(accessToken);

    await UpdateReactions(postid, emoji, userid);
    return new Response("OK", { status: 200 });
}