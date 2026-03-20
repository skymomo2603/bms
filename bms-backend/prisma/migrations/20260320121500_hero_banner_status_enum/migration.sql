-- CreateEnum
CREATE TYPE "content"."HeroBannerStatus" AS ENUM ('Active', 'Inactive');

-- AlterTable
ALTER TABLE "content"."herobanner"
ALTER COLUMN "status" DROP DEFAULT,
ALTER COLUMN "status" TYPE "content"."HeroBannerStatus"
USING ("status"::"content"."HeroBannerStatus"),
ALTER COLUMN "status" SET DEFAULT 'Active';