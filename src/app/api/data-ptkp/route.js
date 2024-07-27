import { NextResponse } from 'next/server'

import { getToken } from 'next-auth/jwt'

import prisma from '@/app/lib/prisma'

export async function GET(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  console.log('Token:', token)

  if (!token) {
    console.log('Unauthorized Access : API Ambil ptkp')

    return NextResponse.json({ error: 'Unauthorized Access' }, { status: 401 })
  }

  try {
    const ptkp = await prisma.ptkp.findMany({
      select: {
        id: true,
        tk0:true,
        tk1:true,
        tk2:true,
        tk3:true,
        k0:true,
        k1:true,
        k2:true,
        k3:true,
        ki0:true,
        ki1:true,
        ki2:true,
        ki3:true,
      },
    })

    return NextResponse.json(ptkp, { status: 200 })
  } catch (error) {
    console.error('Error fetching data ptkp:', error)

    return NextResponse.json({ error: 'Terjadi kesalahan saat mengambil data ptkp' }, { status: 500 })
  }
}
