export const prerender = false; // 事前レンダリングを無効化

import type { APIRoute } from "astro";
import { CreatePost, GetSession } from "@/lib/prisma";
import { GetUserID } from "@/lib/user";
import { parse } from "cookie";

export const POST: APIRoute = async ({ request }) => {
    const cookies = parse(request.headers.get('cookie') || '');
    const { is_public, tags, message } = await request.json();
    const access_token = await GetSession(cookies.token);
    const id = await GetUserID(access_token);
    CreatePost(id, is_public, tags, message);
    return new Response("OK", { status: 200 });
};