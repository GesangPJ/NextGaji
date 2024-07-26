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

  const formatToFixed = (num, decimals) => {
    const factor = Math.pow(10, decimals)

    return Math.round(num * factor) / factor
  }

  try {
    const bpjs = await prisma.bpjs.findMany({
      select: {
        id: true,
        bpjskes_perusahaan: true,
        bpjsjht_perusahaan: true,
        bpjsjkk_perusahaan: true,
        bpjsjkm_perusahaan: true,
        bpjsjp_perusahaan: true,
        bpjskes_peg: true,
        bpjsjht_peg: true,
        bpjsjp_peg: true,
      },
    })

    // Konversi nilai BPJS ke persen (dikali 100)
    const formattedbpjs = bpjs.map(bpjs => ({
      ...bpjs,
      bpjskes_perusahaan: formatToFixed(bpjs.bpjskes_perusahaan * 100, 2),
      bpjsjht_perusahaan: formatToFixed(bpjs.bpjsjht_perusahaan * 100, 2),
      bpjsjkk_perusahaan: formatToFixed(bpjs.bpjsjkk_perusahaan * 100, 2),
      bpjsjkm_perusahaan: formatToFixed(bpjs.bpjsjkm_perusahaan * 100, 2),
      bpjsjp_perusahaan: formatToFixed(bpjs.bpjsjp_perusahaan * 100, 2),
      bpjskes_peg: formatToFixed(bpjs.bpjskes_peg * 100, 2),
      bpjsjht_peg: formatToFixed(bpjs.bpjsjht_peg * 100, 2),
      bpjsjp_peg: formatToFixed(bpjs.bpjsjp_peg * 100, 2),
    }))

    return NextResponse.json({bpjs:formattedbpjs}, { status: 200 })
  } catch (error) {
    console.error('Error fetching data bpjs:', error)

    return NextResponse.json({ error: 'Terjadi kesalahan saat mengambil data bpjs' }, { status: 500 })
  }
}
