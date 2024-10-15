import type { APIRoute } from "astro";
import { CreatePost, GetSession } from "@/lib/prisma";

export const POST: APIRoute = async ({ request }) => {
    const { id, is_public, tags, message, session_token } = await request.json();
    const access_token = await GetSession(session_token);
    CreatePost(id, is_public, tags, message);
    return new Response("OK", { status: 200 });
};

export const GET: APIRoute = () => {
    return new Response(JSON.stringify({
        message: "This was a GET!"
    }), { status: 200 });
};