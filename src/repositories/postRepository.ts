import { prisma } from "./prisma";

export function findPostByEmail(userId: string) {
  return prisma.post.findMany({
    where: {
      userId,
    },
  });
}

export async function createPost(userId: string, content: string) {
  return prisma.post.create({
    data: {
      content,
      author: {
        connect: {
          id: userId,
        },
      },
    },
  });
}

export function updatePost(id: string, content: string, updatedAt: Date) {
  return prisma.post.update({
    where: {
      id,
    },
    data: {
      content,
      updatedAt,
    },
  });
}

export function deletePost(id: string) {
  return prisma.post.delete({
    where: {
      id,
    },
  });
}
