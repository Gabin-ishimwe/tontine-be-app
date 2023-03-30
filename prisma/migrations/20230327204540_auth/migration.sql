/*
  Warnings:

  - You are about to alter the column `username` on the `Profile` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACTIVE', 'BANNED', 'DELETED');

-- DropForeignKey
ALTER TABLE "TempOTP" DROP CONSTRAINT "TempOTP_email_fkey";

-- AlterTable
ALTER TABLE "Profile" ALTER COLUMN "username" SET DATA TYPE VARCHAR(20);

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'ACTIVE';

-- AddForeignKey
ALTER TABLE "TempOTP" ADD CONSTRAINT "TempOTP_email_fkey" FOREIGN KEY ("email") REFERENCES "User"("email") ON DELETE CASCADE ON UPDATE CASCADE;
