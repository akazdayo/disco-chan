import type { APIRoute } from "astro";
import { CreatePost } from "@/lib/prisma";

export const POST: APIRoute = async ({ request }) => {
    const { id, is_public, tags, message } = await request.json();
    CreatePost(id, is_public, tags, message);
    return new Response("OK", { status: 200 });
};

export const GET: APIRoute = () => {
    return new Response(JSON.stringify({
        message: "This was a GET!"
    }), { status: 200 });
};