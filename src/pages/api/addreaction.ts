//export const prerender = false; // 事前レンダリングを無効化

import type { APIRoute } from "astro";
import { GetAccessToken } from "@/lib/prisma";
import { UpdateReactions } from "@/lib/prisma";
import { GetUserID } from "@/lib/user";
import { parse } from "cookie";

// POST /api/addreaction
// Add a reaction to a post
export const POST: APIRoute = async ({ request }) => {
    // Get cookies
    const cookies = parse(request.headers.get('cookie') || '');
    // Get emoji and postid from request body
    const { emoji, postid }: { emoji: string; postid: number } = await request.json();
    if (!cookies.token || !emoji) { // null check
        throw new Error("Invalid request");
    }

    // Get access token from session token
    const accessToken = await GetAccessToken(cookies.token);
    if (!accessToken) { // null check
        throw new Error("Invalid session");
    }
    // Get discord userID from access token
    const userid = await GetUserID(accessToken);

    // Update reactions
    await UpdateReactions(postid, emoji, userid);
    return new Response("OK", { status: 200 });
}