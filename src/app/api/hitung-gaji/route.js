// API Hitung Slip Gaji Per Karyawan

import { NextResponse } from "next/server"

import { getToken } from "next-auth/jwt"

import prisma from "@/app/lib/prisma"

export const POST = async (req) => {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  const resetKey = process.env.ADMIN_KEY

  console.log('Token :', token)

  if (!token) {
    console.log('Unauthorized Access : API Hitung Gaji Karyawan')

    return NextResponse.json({ error: 'Unauthorized Access' }, { status: 401 })
  }

  try {
    const {
      userId,periode,is_bpjs,is_pph21,keterangan,masterKey
    } = await req.json()

    if (!userId || !periode || !is_bpjs || !is_pph21 || !masterKey) {
      return NextResponse.json({ error: "Data tidak boleh kosong!" }, { status: 400 })
    }

    if (masterKey !== resetKey) {
      return NextResponse.json({ error: "MasterKey Salah!" }, { status: 403 })
    }

    // Ambil Gaji Pokok User
    const users = await prisma.user.findUnique({
      where: {id:userId,},
      select:{
        gajipokok:true,
        tanggungan:true,
        menikah:true,
        ptkp_gabungan:true,
      }
    })

    // Ambil nilai BPJS
    const bpjs = await prisma.bpjs.findFirst()

    // Ambil nilai PTKP
    const ptkp = await prisma.ptkp.findFirst()

    // Ambil nilai pph21
    const pph21 = await prisma.pph21.findFirst()

    // Ambil nilai tunjangan
    const tunjangan = await prisma.tunjangan.findFirst()

    if (!bpjs || !ptkp || !pph21 || !tunjangan) {
      console.log('Data referensi (bpjs, ptkp, pph21, tunjangan) tidak bisa diambil!')

      return NextResponse.json({ error: "Data referensi tidak ditemukan!" }, { status: 500 })
    }

    // Deklarasi variabel yang akan dipakai
    let hitung_gaji_gross = 0
    let hitung_gaji_nett = 0
    let hitung_gaji_nett_tahunan = 0
    let hitung_nilai_pph21bulanan = 0
    let hitung_nilai_pph21tahunan = 0
    let biaya_bpjs_perusahaan = 0
    let hitung_bpjs_pegawai = 0
    let hitung_ptkp = 0

    // Hitung total semua tunjangan
    const total_tunjangan = (
      tunjangans.tunjangan_internet +
      tunjangans.tunjangan_lainnya +
      tunjangans.tunjangan_transport +
      tunjangans.tunjangan_makan
    )

    // Hitung gaji gross
    hitung_gaji_gross = users.gajipokok + total_tunjangan

    // Jika BPJS termasuk perhitungan gaji
    if(is_bpjs){
      const nilai_bpjskesper = Math.floor(users.gajipokok * bpjss.bpjskes_perusahaan)
      const nilai_bpjsjhtper = Math.floor(users.gajipokok * bpjss.bpjsjht_perusahaan)
      const nilai_bpjsjkkper = Math.floor(users.gajipokok * bpjss.bpjsjkk_perusahaan)
      const nilai_bpjsjkmper = Math.floor(users.gajipokok * bpjss.bpjsjkm_perusahaan)
      const nilai_bpjsjpper = Math.floor(users.gajipokok * bpjss.bpjsjp_perusahaan)

      const nilai_bpjskespeg = Math.floor(users.gajipokok * bpjss.bpjskes_peg)
      const nilai_bpjsjhtpeg = Math.floor(users.gajipokok * bpjss.bpjsjht_peg)
      const nilai_bpjsjppeg = Math.floor(users.gajipokok * bpjss.bpjsjp_peg)

      hitung_bpjs_pegawai = nilai_bpjskespeg + nilai_bpjsjhtpeg + nilai_bpjsjppeg

      biaya_bpjs_perusahaan = nilai_bpjskesper + nilai_bpjsjhtper + nilai_bpjsjkkper + nilai_bpjsjkmper + nilai_bpjsjpper
    }
    else{
    hitung_bpjs_pegawai = 0
    biaya_bpjs_perusahaan = 0
    }

    // Hitung gaji nett
    hitung_gaji_nett = hitung_gaji_gross - hitung_bpjs_pegawai
    hitung_gaji_nett_tahunan = hitung_gaji_nett * 12

    // Hitung Nilai PTKP

    // Jika sudah menikah
    if(users.menikah){

      // Jika PTKP menikah dan gabungan
      if(users.ptkp_gabungan){
        switch(users.tanggungan){

          // Jika tanggungan 0
          case users.tanggungan = 0:
            hitung_ptkp = Math.max(hitung_gaji_nett_tahunan - ptkp.ki0, 0)
            break

          // Jika tanggungan 1
          case users.tanggungan = 1:
            hitung_ptkp = Math.max(hitung_gaji_nett_tahunan - ptkp.ki1, 0)
            break

          // Jika tanggungan 2
          case users.tanggungan = 2:
            hitung_ptkp = Math.max(hitung_gaji_nett_tahunan - ptkp.ki2, 0)
            break

          // Jika tanggungan 3
          case users.tanggungan = 3:
            hitung_ptkp = Math.max(hitung_gaji_nett_tahunan - ptkp.ki3, 0)
            break

          default :
            console.log('PTKP tidak bisa dihitung')
        }
      }

      // Jika PTKP menikah dan bukan gabungan
      else{
        switch(users.tanggungan){

          // Jika tanggungan 0
          case users.tanggungan = 0:
            hitung_ptkp = Math.max(hitung_gaji_nett_tahunan - ptkp.k0, 0)
            break

          // Jika tanggungan 1
          case users.tanggungan = 1:
            hitung_pkp = Math.max(hitung_gaji_nett_tahunan - ptkp.k1, 0)
            break

          // Jika tanggungan 2
          case users.tanggungan = 2:
            hitung_ptkp = Math.max(hitung_gaji_nett_tahunan - ptkp.k2, 0)
            break

          // Jika tanggungan 3
          case users.tanggungan = 3:
            hitung_ptkp = Math.max(hitung_gaji_nett_tahunan - ptkp.k3, 0)
            break

          default:
            console.log('PTKP tidak bisa dihitung')
        }
      }
    }

    // Jika PTKP belum menikah
    else{
      switch(users.tanggungan){

        // Jika tanggungan 0
        case users.tanggungan = 0:
          hitung_ptkp = Math.max(hitung_gaji_nett_tahunan - ptkp.tk0, 0)
          break

        // Jika tanggungan 1
        case users.tanggungan = 1:
          hitung_ptkp = Math.max(hitung_gaji_nett_tahunan - ptkp.tk1, 0)
          break

        // Jika tanggungan 2
        case users.tanggungan = 2:
          hitung_ptkp = Math.max(hitung_gaji_nett_tahunan - ptkp.tk2, 0)
          break

        // Jika tanggungan 3
        case users.tanggungan =3:
          hitung_ptkp = Math.max(hitung_gaji_nett_tahunan - ptkp.tk3, 0)
          break

        default:
          console.log('PTKP tidak bisa dihitung')
      }

    }

    // Hitung nilai PKP
    let hitung_pkp = Math.max(hitung_gaji_nett_tahunan - hitung_ptkp, 0)

    // Pembulatan PKP ke ribuan
    hitung_pkp = Math.floor(hitung_pkp / 1000) * 1000

    // Hitung besaran pph21
    if(is_pph21){
      switch(hitung_pkp){

        // Jika PKP sampai dengan 60JT
        case hitung_pkp <= 60000000 :
          hitung_nilai_pph21tahunan = Math.floor(hitung_pkp * pph21.pph21_60)
          hitung_nilai_pph21bulanan = hitung_nilai_pph21tahunan / 12
          break

        // Jika PKP sampai dengan 250JT
        case hitung_pkp > 60000000 && hitung_pkp <= 250000000 :
          hitung_nilai_pph21tahunan = Math.floor(hitung_pkp * pph21.pph21_250)
          hitung_nilai_pph21bulanan = hitung_nilai_pph21tahunan / 12
          break

        // Jika PKP sampai dengan 500JT
        case hitung_pkp > 250000000 && hitung_pkp <= 500000000 :
          hitung_nilai_pph21tahunan = Math.floor(hitung_pkp * pph21.pph21_500)
          hitung_nilai_pph21bulanan = hitung_nilai_pph21tahunan / 12
          break

        // Jika PKP sampai dengan 5Milyar
        case hitung_pkp > 500000000 && hitung_pkp <= 5000000000 :
          hitung_nilai_pph21tahunan = Math.floor(hitung_pkp * pph21.pph21_5m)
          hitung_nilai_pph21bulanan = hitung_nilai_pph21tahunan / 12
          break

        // Jika PKP diatas 5Milyar
        case hitung_pkp > 5000000000 :
          hitung_nilai_pph21tahunan = Math.floor(hitung_pkp * pph21.pph21_5ma)
          hitung_nilai_pph21bulanan = hitung_nilai_pph21tahunan / 12
          break

        default :
        console.log('Tidak bisa menghitung nilai pph21')
      }
    }
    else{
      hitung_nilai_pph21tahunan = 0
      hitung_nilai_pph21bulanan = 0
    }

    // Masukkan hasil perhitungan ke variabel baru
    const nilai_pph21_bulanan = hitung_nilai_pph21bulanan
    const nilai_pph21_tahunan = hitung_nilai_pph21tahunan
    const tagihan_bpjs_perusahaan = biaya_bpjs_perusahaan
    const now = new Date()
    const dibuat = now.toISOString

    // Hitung Gaji perbulan diterima
    const gajiditerima = hitung_gaji_nett - nilai_pph21_bulanan

    try{
      const gajis = await prisma.gaji.create({
        data:{
          userId,
          dibuat,
          periode,
          diubah:dibuat,
          tunjangan_lainnya: tunjangans.tunjangan_lainnya,
          tunjangan_makan: tunjangans.tunjangan_makan,
          tunjangan_transport: tunjangans.tunjangan_transport,
          tunjangan_internet: tunjangans.tunjangan_internet,
          gaji_pokok: users.gajipokok,
          bpjskes_perusahaan: nilai_bpjskesper,
          bpjsjht_perusahaan: nilai_bpjsjhtper,
          bpjsjkk_perusahaan: nilai_bpjsjkkper,
          bpjsjkm_perusahaan: nilai_bpjsjkmper,
          bpjsjp_perusahaan: nilai_bpjsjpper,
          bpjskes_peg: nilai_bpjskespeg,
          bpjsjht_peg: nilai_bpjsjhtpeg,
          bpjsjp_peg: nilai_bpjsjppeg,
          gaji_gross: hitung_gaji_gross,
          gaji_bersih_bulanan: hitung_gaji_nett,
          gaji_bersih_tahunan: hitung_gaji_nett_tahunan,
          ptkp_karyawan: hitung_ptkp,
          pph21_bulanan: nilai_pph21_bulanan,
          pph21_tahunan: nilai_pph21_tahunan,
          gaji_diterima: gajiditerima,
          keterangan,
        },
      })

      console.log('Gaji dibuat :', gajis)

      return NextResponse.json(gajis, {status:201})
    }
    catch(error){
      console.error('Error memasukkan Gaji ke Database :', error)

      return NextResponse.json({ error: "Gaji sudah ada" }, { status: 400 })
    }
  }
  catch(error){
    console.error('Error parsing request body :', error)

    return NextResponse.json({error: "Invalid JSON format"}, {status:500})
  }
}
