/*
  Warnings:

  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CategoryToCourse` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_courseId_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToCourse" DROP CONSTRAINT "_CategoryToCourse_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToCourse" DROP CONSTRAINT "_CategoryToCourse_B_fkey";

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "categoryId" TEXT,
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Image";

-- DropTable
DROP TABLE "_CategoryToCourse";

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE INDEX "Course_categoryId_idx" ON "Course"("categoryId");

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
