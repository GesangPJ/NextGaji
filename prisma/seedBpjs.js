// prisma/seed.js
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  const bpjskes_perusahaan = 0.04
  const bpjsjht_perusahaan = 0.037
  const bpjsjkk_perusahaan = 0.0024
  const bpjsjp_perusahaan = 0.02
  const bpjsjkm_perusahaan = 0.003
  const bpjskes_peg = 0.01
  const bpjsjht_peg = 0.02
  const bpjsjp_peg = 0.01

  try {
    // Create the user
    const bpjs = await prisma.bpjs.create({
      data: {
        bpjskes_perusahaan,
        bpjsjht_perusahaan,
        bpjsjkk_perusahaan,
        bpjsjp_perusahaan,
        bpjsjkm_perusahaan,
        bpjskes_peg,
        bpjsjht_peg,
        bpjsjp_peg,
      },
    })

    console.log('User created:', bpjs)
  } catch (error) {
    console.error('Error creating BPJS:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
