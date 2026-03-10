-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "content";

-- AlterTable
ALTER TABLE "booking"."room" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'Active';

-- CreateTable
CREATE TABLE "content"."herobanner" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "remarks" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "herobanner_pkey" PRIMARY KEY ("id")
);
