/*
  Warnings:

  - Added the required column `userId` to the `experience` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "experience" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "project" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user_account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "experience" ADD CONSTRAINT "experience_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user_account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
