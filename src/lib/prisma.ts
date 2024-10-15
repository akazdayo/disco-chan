import { PrismaClient } from "@prisma/client";
import { ulid } from 'ulid';

const prisma = new PrismaClient();

export interface TokenResponse {
    token_type: string;
    access_token: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
    id_token: string;
}

export async function GetPosts() {
    // TODO: 上位10件の投稿を取得する様にする
    const allPosts = await prisma.posts.findMany();
    return allPosts.reverse();
}

export function CreatePost(userid: number, is_public: boolean, tags: string[], message: string) {
    console.log(`${userid}, ${is_public}, ${tags}, ${message}`);
    prisma.posts.create({
        data: {
            userid: userid,
            is_public: is_public,
            tags: tags,
            message: message
        }
    }).then(newPost => {
        console.log(newPost);
    }).catch(error => {
        console.error("Error creating post:", error);
    });
}

export function UploadProfile(userid: number, username: string, avatar: string) {
    prisma.users.create({
        data: {
            id: userid,
            username: username,
            icon: avatar
        }
    }).then(newProfile => {
        console.log(newProfile);
    }).catch(error => {
        console.error("Error creating profile:", error);
    });
}

export async function CreateSession(tokens: TokenResponse, id: number): Promise<string> {
    // TODO: 既に存在するか確認する。存在する場合は更新する

    const timestamp = Math.floor(new Date().getTime() / 1000);
    const session = ulid(timestamp);

    try {
        const newSession = await prisma.tokens.create({
            data: {
                session: session,
                access: tokens.access_token,
                userid: id,
                refresh: tokens.refresh_token,
                expires_at: new Date(Date.now() + tokens.expires_in * 1000).toISOString(), //合ってるかわからないから、確認
            }
        });
        return newSession.session;
    } catch (error) {
        console.error("Error creating session:", error);
        throw error;
    }
}

export async function GetSession(session: string): Promise<string> {
    const token = await prisma.tokens.findFirst({
        where: {
            session: session
        }
    });
    if (!token) {
        throw new Error("Session not found");
    }
    return token.access;
}