-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "booking";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "content";

-- CreateEnum
CREATE TYPE "content"."Status" AS ENUM ('Active', 'Inactive');

-- CreateTable
CREATE TABLE "content"."herobanner" (
    "id" SERIAL NOT NULL,
    "headline" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "remarks" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "status" "content"."Status" NOT NULL DEFAULT 'Active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "herobanner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "content"."carousel" (
    "id" SERIAL NOT NULL,
    "headline" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "remarks" TEXT NOT NULL,
    "status" "content"."Status" NOT NULL DEFAULT 'Active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "carousel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "content"."carouselimage" (
    "id" SERIAL NOT NULL,
    "carouselId" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "caption" TEXT,
    "order" INTEGER NOT NULL,
    "status" "content"."Status" NOT NULL DEFAULT 'Active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "carouselimage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "booking"."room" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "room_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "content"."carouselimage" ADD CONSTRAINT "carouselimage_carouselId_fkey" FOREIGN KEY ("carouselId") REFERENCES "content"."carousel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
