import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

const globalforPrisma = global as unknown as { prisma: typeof prisma };

if (process.env.NODE_ENV !== "production") globalforPrisma.prisma = prisma;

export const db = prisma;