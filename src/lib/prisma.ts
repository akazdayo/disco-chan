import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GetPosts(){
    // TODO: 上位10件の投稿を取得する様にする
    const allPosts = await prisma.posts.findMany();
    return allPosts;
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