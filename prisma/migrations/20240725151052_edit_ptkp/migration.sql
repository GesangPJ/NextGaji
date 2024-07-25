/*
  Warnings:

  - You are about to drop the column `nama_ptkp` on the `Ptkp` table. All the data in the column will be lost.
  - You are about to drop the column `nilai_ptkp` on the `Ptkp` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Ptkp" DROP COLUMN "nama_ptkp",
DROP COLUMN "nilai_ptkp",
ADD COLUMN     "k0" DOUBLE PRECISION,
ADD COLUMN     "k1" DOUBLE PRECISION,
ADD COLUMN     "k2" DOUBLE PRECISION,
ADD COLUMN     "k3" DOUBLE PRECISION,
ADD COLUMN     "ki0" DOUBLE PRECISION,
ADD COLUMN     "ki1" DOUBLE PRECISION,
ADD COLUMN     "ki2" DOUBLE PRECISION,
ADD COLUMN     "ki3" DOUBLE PRECISION,
ADD COLUMN     "tk0" DOUBLE PRECISION,
ADD COLUMN     "tk1" DOUBLE PRECISION,
ADD COLUMN     "tk2" DOUBLE PRECISION,
ADD COLUMN     "tk3" DOUBLE PRECISION;
