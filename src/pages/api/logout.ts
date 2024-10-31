import type { APIRoute } from "astro";
// POST /api/logout
// Logout
export const POST: APIRoute = async ({ cookies }) => {
    cookies.delete("token", { path: "/" });
    cookies.delete("is_login", { path: "/" });
    return new Response("OK", { status: 200 });
};