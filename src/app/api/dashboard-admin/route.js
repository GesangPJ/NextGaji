// API Dashboard Admin. Lokasi : /src/app/api/dashboard-admin/route.js

import { NextResponse } from 'next/server'

import { getToken } from 'next-auth/jwt'

import prisma from '@/app/lib/prisma'

export async function GET(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  console.log('Token:', token)

  if (!token) {
    console.log('Unauthorized Access : API Dashboard Admin')

    return NextResponse.json({ error: 'Unauthorized Access' }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const userId = searchParams.get('userId')

  if (!userId) {
    return NextResponse.json({ error: 'User ID tidak ditemukan!' }, { status: 400 })
  }

  console.log(userId)

  try {
    const gajis = await prisma.gaji.findMany({
      select: {
        id: true,
        periode:true,
        gaji_diterima:true,
        gaji_gross:true,
        pph21_bulanan:true,
        pph21_tahunan:true,
        ptkp_karyawan:true,
        userId: true,
        user: {
          select: {
            name: true,
          },
        },
      },
    })

    // Konversi tanggal ke format ISO dan tambahkan nama karyawan dan admin
    const formattedgajis = gajis.map(gaji => ({
      ...gaji,
      dibuat: gaji.dibuat.toISOString(),
      diubah: gaji.diubah.toISOString(),
      namaAkun: gaji.user?.name || '-',
    }))

    // Menghitung jumlah total, total setuju, total lunas, dan belum lunas
    const GajiDiterima = gajis.reduce((acc, gaji) => acc + gaji.gaji_diterima, 0)
    const TotalPph21Bulanan = gajis.reduce((acc, gaji)=> acc + gaji.pph21_bulanan,0)

    return NextResponse.json({
      gaji: formattedgajis,
      GajiDiterima,
      TotalPph21Bulanan,
    }, { status: 200 })
  } catch (error) {
    console.error('Error fetching data gaji:', error)

    return NextResponse.json({ error: 'Terjadi kesalahan saat mengambil data gaji' }, { status: 500 })
  }
}
