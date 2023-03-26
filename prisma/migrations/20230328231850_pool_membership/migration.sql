/*
  Warnings:

  - You are about to drop the `PoolMembers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PoolMembers" DROP CONSTRAINT "PoolMembers_memberId_fkey";

-- DropForeignKey
ALTER TABLE "PoolMembers" DROP CONSTRAINT "PoolMembers_poolId_fkey";

-- DropTable
DROP TABLE "PoolMembers";

-- CreateTable
CREATE TABLE "PoolMembership" (
    "id" TEXT NOT NULL,
    "status" "InvitedStatus" NOT NULL DEFAULT 'PENDING',
    "memberId" TEXT NOT NULL,
    "poolId" TEXT NOT NULL,

    CONSTRAINT "PoolMembership_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PoolMembership_id_key" ON "PoolMembership"("id");

-- CreateIndex
CREATE UNIQUE INDEX "PoolMembership_memberId_key" ON "PoolMembership"("memberId");

-- AddForeignKey
ALTER TABLE "PoolMembership" ADD CONSTRAINT "PoolMembership_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PoolMembership" ADD CONSTRAINT "PoolMembership_poolId_fkey" FOREIGN KEY ("poolId") REFERENCES "Pools"("id") ON DELETE CASCADE ON UPDATE CASCADE;
