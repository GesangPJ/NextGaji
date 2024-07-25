// prisma/seed.js
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  const tk0 = 54000000
  const tk1 = 58500000
  const tk2 = 63000000
  const tk3 = 67500000

  const k0 = 58500000
  const k1 = 63000000
  const k2 = 67500000
  const k3 = 72000000

  const ki0 = 112500000
  const ki1 = 117000000
  const ki2 = 121500000
  const ki3 = 126000000

  try {
    // Create the user
    const ptkp = await prisma.ptkp.create({
      data: {
        tk0,tk1,tk2,tk3,k0,k1,k2,k3,ki0,
        ki1,ki2,ki3,
      },
    })

    console.log('PTKP created:', ptkp)
  } catch (error) {
    console.error('Error creating PTKP:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
