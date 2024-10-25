import { PrismaClient } from "@prisma/client";
import type { JsonValue } from "@prisma/client/runtime/library";
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

export interface UserProfile {
    username: string;
    avatar: string;
}

interface Post {
    id: bigint;
    created_at: Date;
    userid: bigint;
    is_public: boolean;
    tags: string[];
    message: string;
    reactions: JsonValue;
}

export async function GetPosts(): Promise<Post[]> {
    // TODO: 上位10件の投稿を取得する様にする
    try {
        const allPosts = await prisma.posts.findMany();
        return allPosts.reverse();
    }
    catch (error) {
        console.error("投稿を取得できませんでした。", error);
        return [];
    }
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

export async function UploadProfile(userid: number, username: string, avatar: string) {
    const exist = await prisma.users.findFirst({
        where: {
            userid: userid
        }
    });
    if (exist) {
        await prisma.users.update({
            where: {
                id: exist.id
            },
            data: {
                id: exist.id,
                userid: userid,
                username: username,
                icon: avatar
            }
        });
        return;
    }

    await prisma.users.create({
        data: {
            userid: userid,
            username: username,
            icon: avatar
        }
    }).then(newProfile => {
        console.log(newProfile);
    }).catch(error => {
        console.error("Error creating profile:", error);
    });
}

export async function CreateSession(tokens: TokenResponse, userid: number): Promise<string> {
    // TODO: TryCatchなんとかする

    const timestamp = Math.floor(new Date().getTime() / 1000);
    const session = ulid(timestamp);

    const exist = await prisma.tokens.findFirst({
        where: {
            userid: userid
        }
    });
    if (exist) {
        await prisma.tokens.update({
            where: {
                session: exist.session
            },
            data: {
                session: session,
                access: tokens.access_token,
                userid: userid,
                refresh: tokens.refresh_token,
                expires_at: new Date(Date.now() + tokens.expires_in * 1000).toISOString(), //合ってるかわからないから、確認
            }
        });
        return session;
    }

    const newSession = await prisma.tokens.create({
        data: {
            session: session,
            access: tokens.access_token,
            userid: userid,
            refresh: tokens.refresh_token,
            expires_at: new Date(Date.now() + tokens.expires_in * 1000).toISOString(), //合ってるかわからないから、確認
        }
    });
    return newSession.session;
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

export async function GetUserProfile(userid: number): Promise<UserProfile | null> {
    const profile = await prisma.users.findFirst({
        where: {
            userid: userid
        }
    });
    if (profile) {
        return {
            username: profile.username,
            avatar: profile.icon
        };
    }
    return null;
}

export async function UpdateReactions(postid: number, emoji: string, userid: number) {
    try {
        // 既存の投稿を取得
        const post = await prisma.posts.findUnique({
            where: { id: postid },
            select: { reactions: true }
        });

        if (!post) {
            throw new Error("Post not found");
        }

    const reactions = post.reactions as { [key: number]: string };

    // 新しいリアクションを追加または更新
    reactions[userid] = emoji;

    // リアクションを更新
    await prisma.posts.update({
        where: { id: postid },
        data: {
            reactions: reactions
        }
    });
    } catch (error) {
        console.error("Error updating reactions:", error);
    }
}