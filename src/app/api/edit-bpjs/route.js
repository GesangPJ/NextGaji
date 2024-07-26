// API Edit Data BPJS. Lokasi : /src/app/api/edit-admin

// API untuk mengubah data nilai BPJS.

import { NextResponse } from "next/server"

import { getToken } from "next-auth/jwt"

import prisma from "@/app/lib/prisma"

export const PUT = async (req) =>{
  const token = await getToken({req, secret: process.env.NEXTAUTH_SECRET})
  const resetKey = process.env.ADMIN_KEY

  console.log('Token :', token)

  if(!token){
    console.log('Unauthorized Access : API Edit Karyawan')

    return NextResponse.json({error:'Unauthorized Access'}, {status:401})
  }

  try{
    const {
      bpjskes_perusahaan,
      bpjsjht_perusahaan,
      bpjsjkk_perusahaan,
      bpjsjkm_perusahaan,
      bpjsjp_perusahaan,
      bpjsskes_peg,
      bpjsjht_peg,
      bpjsjp_peg,
      masterKey,
    } = await req.json()

    if(!masterKey){
      return NextResponse.json({error:"Data tidak boleh kosong!"}, {status:400})
    }

    if(masterKey !== resetKey){
      return NextResponse.json({error: "MasterKey Salah!"}, {status:403})
    }

    try{
      const bpjs = await prisma.bpjs.update({
        where: {id: 1},
        data:{
          bpjskes_perusahaan,
          bpjsjht_perusahaan,
          bpjsjkk_perusahaan,
          bpjsjkm_perusahaan,
          bpjsjp_perusahaan,
          bpjsskes_peg,
          bpjsjht_peg,
          bpjsjp_peg,
        },
      })

      return NextResponse.json({message:"Data Nilai BPJS Berhasil diubah", bpjs}, {status:200})
    }
    catch(error){
      console.error("Error mengubah data nilai BPJS : ", error)

      return NextResponse.json({error:"Ada kesalahan ketika mengganti data nilai BPJS"}, {status:500})
    }
  }
  catch(error){
    console.error("Error tidak dapat parsing request body", error)

    return NextResponse.json({error:"Bad Request"}, {status:400})
  }
}
