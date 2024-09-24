-- CreateTable
CREATE TABLE "posts" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userid" BIGINT NOT NULL,
    "is_public" BOOLEAN NOT NULL,
    "tags" TEXT[],
    "message" TEXT NOT NULL,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);
