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

// get top10 posts
export async function GetPosts(): Promise<Post[]> {
    // TODO: 上位10件の投稿を取得する様にする
    try {
        // Get all posts
        const allPosts = await prisma.posts.findMany();
        // Sort posts by created_at in descending order
        allPosts.sort((a, b) => b.created_at.getTime() - a.created_at.getTime());
        return allPosts;
    }
    catch (error) {
        console.error("投稿を取得できませんでした。", error);
        return [];
    }
}

// Create a post in the database
export function CreatePost(userid: number, is_public: boolean, tags: string[], message: string) {
    prisma.posts.create({
        data: {
            userid: userid,
            is_public: is_public,
            tags: tags,
            message: message
        }
    }).catch(error => {
        // error handling
        console.error("Error creating post:", error);
    });
}

// Upload a user profile to the database
// if the user already exists, update the profile
export async function UploadProfile(userid: number, username: string, avatar: string) {
    // Check if the user already has a user profile
    const exist = await prisma.users.findFirst({
        where: {
            userid: userid
        }
    });
    if (exist) {
        // update the user profile
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

    // create a new user profile
    await prisma.users.create({
        data: {
            userid: userid,
            username: username,
            icon: avatar
        }
    }).catch(error => {
        console.error("Error creating profile:", error);
    });
}

export async function CreateSession(tokens: TokenResponse, userid: number): Promise<string> {
    // TODO: TryCatchなんとかする

    // Get the current timestamp for generate the new sessionID
    const timestamp = Math.floor(new Date().getTime() / 1000);
    const session = ulid(timestamp);

    // Check if the user already has a session
    const exist = await prisma.tokens.findFirst({
        where: {
            userid: userid
        }
    });
    if (exist) {
        // update the session
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

    // create a new session
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

// Get the access token from the session token
export async function GetAccessToken(session: string): Promise<string> {
    // search the session token in the database
    const token = await prisma.tokens.findFirst({
        where: {
            session: session
        }
    });
    if (!token) {
        throw new Error("Session not found");
    }

    // return the access token
    return token.access;
}

// Get the user profile from the access token
export async function GetUserProfile(userid: number): Promise<UserProfile | null> {
    // search the user profile in the database
    const profile = await prisma.users.findFirst({
        where: {
            userid: userid
        }
    });

    // null check
    if (profile) {
        return {
            username: profile.username,
            avatar: profile.icon
        };
    }
    return null;
}

// Update the reactions of a post
export async function UpdateReactions(postid: number, emoji: string, userid: number) {
    try {
        // get the post
        const post = await prisma.posts.findUnique({
            where: { id: postid },
            select: { reactions: true }
        });

        // null check
        if (!post) {
            throw new Error("Post not found");
        }

        // get the reactions
        const reactions = post.reactions as { [key: number]: string };

        // update the reactions or add a new reaction
        reactions[userid] = emoji;

        // update the database
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