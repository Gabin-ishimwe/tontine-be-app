/*
  Warnings:

  - You are about to drop the column `poolId` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the `InvitedMembers` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `createdBy` to the `Pools` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "InvitedMembers" DROP CONSTRAINT "InvitedMembers_memberId_fkey";

-- DropForeignKey
ALTER TABLE "InvitedMembers" DROP CONSTRAINT "InvitedMembers_poolId_fkey";

-- DropForeignKey
ALTER TABLE "Users" DROP CONSTRAINT "Users_poolId_fkey";

-- AlterTable
ALTER TABLE "Pools" ADD COLUMN     "createdBy" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "poolId";

-- DropTable
DROP TABLE "InvitedMembers";

-- CreateTable
CREATE TABLE "PoolMembers" (
    "id" TEXT NOT NULL,
    "status" "InvitedStatus" NOT NULL DEFAULT 'PENDING',
    "memberId" TEXT NOT NULL,
    "poolId" TEXT NOT NULL,

    CONSTRAINT "PoolMembers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PoolMembers_id_key" ON "PoolMembers"("id");

-- CreateIndex
CREATE UNIQUE INDEX "PoolMembers_memberId_key" ON "PoolMembers"("memberId");

-- AddForeignKey
ALTER TABLE "Pools" ADD CONSTRAINT "Pools_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PoolMembers" ADD CONSTRAINT "PoolMembers_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PoolMembers" ADD CONSTRAINT "PoolMembers_poolId_fkey" FOREIGN KEY ("poolId") REFERENCES "Pools"("id") ON DELETE CASCADE ON UPDATE CASCADE;
