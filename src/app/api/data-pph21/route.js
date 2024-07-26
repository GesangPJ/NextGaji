import { NextResponse } from 'next/server'

import { getToken } from 'next-auth/jwt'

import prisma from '@/app/lib/prisma'

export async function GET(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  console.log('Token:', token)

  if (!token) {
    console.log('Unauthorized Access : API Ambil PPH21')

    return NextResponse.json({ error: 'Unauthorized Access' }, { status: 401 })
  }

  const formatToFixed = (num, decimals) => {
    const factor = Math.pow(10, decimals)

    return Math.round(num * factor) / factor
  }

  try {
    const pph21 = await prisma.pph21.findMany({
      select: {
        id: true,
        pph21_60:true,
        pph21_250:true,
        pph21_500:true,
        pph21_5m:true,
        pph21_5ma:true,
      },
    })

    // Format ke Persen
    const formattedpph21 = pph21.map(pph21 => ({
      ...pph21,
      pph21_60: formatToFixed(pph21.pph21_60 * 100, 2),
      pph21_250: formatToFixed(pph21.pph21_250 * 100,2),
      pph21_500: formatToFixed(pph21_500 * 100, 2),
      pph21_5m: formatToFixed(pph21.pph21_5m * 100, 2),
      pph21_5ma: formatToFixed(pph21.pph21_5ma * 100, 2),
    }))

    return NextResponse.json({pph21:formattedpph21}, { status: 200 })
  } catch (error) {
    console.error('Error fetching data pph21:', error)

    return NextResponse.json({ error: 'Terjadi kesalahan saat mengambil data pph21' }, { status: 500 })
  }
}
