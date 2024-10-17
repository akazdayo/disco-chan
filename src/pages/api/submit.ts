import type { APIRoute } from "astro";
import { CreatePost, GetSession } from "@/lib/prisma";
import { GetUserID } from "@/lib/user";

export const POST: APIRoute = async ({ request }) => {
    const { is_public, tags, message, session_token } = await request.json();
    const access_token = await GetSession(session_token);
    const id = await GetUserID(access_token);
    CreatePost(id, is_public, tags, message);
    return new Response("OK", { status: 200 });
};