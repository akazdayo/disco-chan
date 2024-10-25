export const prerender = false; // 事前レンダリングを無効化

import type { APIRoute } from "astro";
import { CreatePost, GetAccessToken } from "@/lib/prisma";
import { GetUserID } from "@/lib/user";
import { parse } from "cookie";

// POST /api/submit
// Create a post
export const POST: APIRoute = async ({ request }) => {
    // Get cookies
    const cookies = parse(request.headers.get('cookie') || '');
    // Get is_public, tags, and message from request body
    const { is_public, tags, message } = await request.json();

    // Get access token from session token
    const access_token = await GetAccessToken(cookies.token);
    // Get discord userID from access token
    const userid = await GetUserID(access_token);

    // Create a post
    CreatePost(userid, is_public, tags, message);
    return new Response("OK", { status: 200 });
};