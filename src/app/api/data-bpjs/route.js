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
      bpjskes_perusahaan: bpjs.bpjskes_perusahaan * 100,
      bpjsjht_perusahaan: bpjs.bpjsjht_perusahaan * 100,
      bpjsjkk_perusahaan: bpjs.bpjsjkk_perusahaan * 100,
      bpjsjkm_perusahaan: bpjs.bpjsjkm_perusahaan * 100,
      bpjsjp_perusahaan: bpjs.bpjsjp_perusahaan * 100,
      bpjskes_peg: bpjs.bpjskes_peg * 100,
      bpjsjht_peg: bpjs.bpjsjht_peg * 100,
      bpjsjp_peg: bpjs.bpjsjp_peg * 100,
    }))


    return NextResponse.json({
      bpjs: formattedbpjs,
    }, { status: 200 })
  } catch (error) {
    console.error('Error fetching data bpjs:', error)

    return NextResponse.json({ error: 'Terjadi kesalahan saat mengambil data bpjs' }, { status: 500 })
  }
}
