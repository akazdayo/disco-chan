/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
    readonly PUBLIC_DISCORD_OAUTH_URL: string;
    readonly DISCORD_CLIENT_ID: string;
    readonly DISCORD_CLIENT_SECRET: string;
    readonly DISCORD_REDIRECT_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}