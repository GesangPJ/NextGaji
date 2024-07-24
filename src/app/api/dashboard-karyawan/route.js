// API Dashboard Karyawan. Lokasi : /src/app/api/dashboard-karyawan/route.js

import { NextResponse } from 'next/server'

import { getToken } from 'next-auth/jwt'

import prisma from '@/app/lib/prisma'

export async function GET(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  console.log('Token:', token)

  if (!token) {
    console.log('Unauthorized Access : API Dashboard Karyawan')

    return NextResponse.json({ error: 'Unauthorized Access' }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const userId = searchParams.get('userId')

  if (!userId) {
    return NextResponse.json({ error: 'ID tidak ditemukan!' }, { status: 400 })
  }

  try {
    const gajis = await prisma.gaji.findMany({
      where: {
        userId: parseInt(userId),
      },
      select: {
        id: true,
        periode:true,
        gaji_diterima:true,
        gaji_gross:true,
        pph21_bulanan:true,
        pph21_tahunan:true,
        ptkp_karyawan:true,
      },
    })

    return NextResponse.json(gajis, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Terjadi kesalahan saat mengambil data gaji' }, { status: 500 })
  }
}
