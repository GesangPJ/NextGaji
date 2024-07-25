// prisma/seed.js
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  const pph21_60 = 0.05
  const pph21_250 = 0.15
  const pph21_500 = 0.25
  const pph21_5m = 0.3
  const pph21_5ma = 0.35

  try {
    // Create the user
    const pph21 = await prisma.pph21.create({
      data: {
        pph21_60,
        pph21_250,
        pph21_500,
        pph21_5m,
        pph21_5ma,
      },
    })

    console.log('User created:', pph21)
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
