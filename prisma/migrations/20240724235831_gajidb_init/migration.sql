-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "npwp" INTEGER NOT NULL,
    "nik" INTEGER NOT NULL,
    "status_akun" TEXT NOT NULL DEFAULT 'AKTIF',
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "userType" TEXT DEFAULT 'KARYAWAN',
    "alamat" TEXT,
    "telepon" INTEGER,
    "tanggungan" INTEGER DEFAULT 0,
    "gajipokok" INTEGER NOT NULL,
    "jabatan" TEXT NOT NULL,
    "tunjangan_jabatan" TEXT,
    "jeniskelamin" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pph21" (
    "id" SERIAL NOT NULL,
    "nama_pph21" TEXT NOT NULL,
    "nilai_pph21" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Pph21_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ptkp" (
    "id" SERIAL NOT NULL,
    "nama_ptkp" TEXT NOT NULL,
    "nilai_ptkp" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Ptkp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bpjs" (
    "id" SERIAL NOT NULL,
    "bpjskes_perusahaan" DOUBLE PRECISION NOT NULL,
    "bpjsjht_perusahaan" DOUBLE PRECISION NOT NULL,
    "bpjsjkk_perusahaan" DOUBLE PRECISION NOT NULL,
    "bpjsjkm_perusahaan" DOUBLE PRECISION NOT NULL,
    "bpjsjp_perusahaan" DOUBLE PRECISION NOT NULL,
    "bpjskes_peg" DOUBLE PRECISION NOT NULL,
    "bpjsjht_peg" DOUBLE PRECISION NOT NULL,
    "bpjsjp_peg" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Bpjs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gaji" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "dibuat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diubah" TIMESTAMP(3) NOT NULL,
    "periode" TEXT NOT NULL,
    "gaji_pokok" INTEGER NOT NULL,
    "tunjangan_anak" INTEGER DEFAULT 0,
    "tunjangan_transport" INTEGER DEFAULT 0,
    "tunjangan_internet" INTEGER DEFAULT 0,
    "tunjangan_makan" INTEGER DEFAULT 0,
    "bpjskes_perusahaan" DOUBLE PRECISION DEFAULT 0,
    "bpjsjht_perusahaan" DOUBLE PRECISION DEFAULT 0,
    "bpjsjkk_perusahaan" DOUBLE PRECISION DEFAULT 0,
    "bpjsjkm_perusahaan" DOUBLE PRECISION DEFAULT 0,
    "bpjsjp_perusahaan" DOUBLE PRECISION DEFAULT 0,
    "gaji_gross" INTEGER NOT NULL,
    "bpjskes_peg" DOUBLE PRECISION DEFAULT 0,
    "bpjsjht_peg" DOUBLE PRECISION DEFAULT 0,
    "bpjsjp_peg" DOUBLE PRECISION DEFAULT 0,
    "gaji_bersih_bulanan" INTEGER NOT NULL,
    "gaji_bersih_tahunan" INTEGER NOT NULL,
    "ptkp_karyawan" INTEGER,
    "pph21_bulanan" INTEGER,
    "pph21_tahunan" INTEGER,
    "gaji_diterima" INTEGER,
    "keterangan" TEXT,

    CONSTRAINT "Gaji_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" SERIAL NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- AddForeignKey
ALTER TABLE "Gaji" ADD CONSTRAINT "Gaji_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
