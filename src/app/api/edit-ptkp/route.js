// API untuk mengubah data nilai BPJS di database.

import { NextResponse } from "next/server"

import { getToken } from "next-auth/jwt"

import prisma from "@/app/lib/prisma"

export const PUT = async (req) => {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  const resetKey = process.env.ADMIN_KEY

  console.log('Token :', token)

  if (!token) {
    console.log('Unauthorized Access : API Edit ptkp')

    return NextResponse.json({ error: 'Unauthorized Access' }, { status: 401 })
  }

  try {
    const {
      tk0,tk1,tk2,tk3,k0,k1,k2,k3,ki0,ki1,ki2,ki3
    } = await req.json()

    if (!tk0 || !tk1 || !tk2 || !tk3 || !k0 || !k1 || !k2 || !k3 || !ki0 || !ki1 || !ki2 || !ki3 ) {
      return NextResponse.json({ error: "Data tidak boleh kosong!" }, { status: 400 })
    }

    if (masterKey !== resetKey) {
      return NextResponse.json({ error: "MasterKey Salah!" }, { status: 403 })
    }

    try {
      const ptkp = await prisma.ptkp.update({
        where: { id: 1 },
        data: tk0,tk1,tk2,tk3,k0,k1,k2,k3,ki0,ki1,ki2,ki3,
      })

      return NextResponse.json({ message: "Data Nilai ptkp Berhasil diubah", ptkp }, { status: 200 })
    } catch (error) {
      console.error("Error mengubah data Nilai ptkp : ", error)

      return NextResponse.json({ error: "Ada kesalahan ketika mengganti data Nilai ptkp" }, { status: 500 })
    }
  } catch (error) {
    console.error("Error tidak dapat parsing request body", error)

    return NextResponse.json({ error: "Bad Request" }, { status: 400 })
  }
}


