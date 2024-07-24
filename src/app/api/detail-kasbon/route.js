// API Detail gaji. Lokasi : /src/app/api/detail-gaji
// API untuk menampilkan detail dari gaji

import { NextResponse } from "next/server"

import { getToken } from 'next-auth/jwt'

import prisma from "@/app/lib/prisma"

export async function GET(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  console.log('Token:', token)

  if (!token) {
    console.log('Unauthorized Access : API Ambil Detail Gaji')

    return NextResponse.json({ error: 'Unauthorized Access' }, { status: 401 })
  }

  const url = new URL(req.url)
  const id = url.searchParams.get("id")

  try {
    if (!id) {
      return NextResponse.json({ error: "nilai Id kosong" }, { status: 400 })
    }

    const gaji = await prisma.gaji.findUnique({
      where: { id: parseInt(id) },
      include: {
        user: { select: { name: true } },
        admin: { select: { name: true } }
      }
    })

    if (!gaji) {
      return NextResponse.json({ error: "gaji tidak ditemukan" }, { status: 404 })
    }

    const formattedgaji = {
      ...gaji,
      dibuat: gaji.dibuat.toISOString(),
      diubah: gaji.diubah.toISOString(),
      namaAkun: gaji.user?.name || "-"
    }

    console.log("Detail gaji", formattedgaji)

    return NextResponse.json(formattedgaji, { status: 200 })
  } catch (error) {
    console.error("Error mengambil data gaji", error)

    return NextResponse.json({ error: "Terjadi kesalahan saat mengambil data gaji" }, { status: 500 })
  }
}
