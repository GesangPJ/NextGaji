// API untuk mengubah data nilai BPJS di database.

import { NextResponse } from "next/server"

import { getToken } from "next-auth/jwt"

import prisma from "@/app/lib/prisma"

export const PUT = async (req) => {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  const resetKey = process.env.ADMIN_KEY

  console.log('Token :', token)

  if (!token) {
    console.log('Unauthorized Access : API Edit Pph21')

    return NextResponse.json({ error: 'Unauthorized Access' }, { status: 401 })
  }

  try {
    const {
      pph21_60,
      pph21_250,
      pph21_500,
      pph21_5m,
      pph21_5ma,
      masterKey,
    } = await req.json()

    // if (!masterKey) {
    //   return NextResponse.json({ error: "Data tidak boleh kosong!" }, { status: 400 })
    // }

    if (masterKey !== resetKey) {
      return NextResponse.json({ error: "MasterKey Salah!" }, { status: 403 })
    }

    // Konversi persen ke float dan bulatkan
    const convertToFloat = (percent) => parseFloat((percent / 100).toFixed(4))

    const pph21Data = {
      pph21_60: convertToFloat(pph21_60),
      pph21_250: convertToFloat(pph21_250),
      pph21_500: convertToFloat(pph21_500),
      pph21_5m: convertToFloat(pph21_5m),
      pph21_5ma: convertToFloat(pph21_5ma),
    }

    try {
      const pph21 = await prisma.pph21.update({
        where: { id: 1 },
        data: pph21Data,
      })

      return NextResponse.json({ message: "Data Nilai Pph21 Berhasil diubah", pph21 }, { status: 200 })
    } catch (error) {
      console.error("Error mengubah data Nilai Pph21 : ", error)

      return NextResponse.json({ error: "Ada kesalahan ketika mengganti data Nilai Pph21" }, { status: 500 })
    }
  } catch (error) {
    console.error("Error tidak dapat parsing request body", error)

    return NextResponse.json({ error: "Bad Request" }, { status: 400 })
  }
}


