// prisma/seed.js
const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')

const prisma = new PrismaClient()

async function main() {
  const email = 'karyawan0@email.com'
  const password = 'karyawan0123'
  const name = 'Karyawan 0'
  const userType = 'KARYAWAN'
  const alamat = "BSD City Zora B1 no.1"
  const telepon = 628123456789
  const jeniskelamin = 'PRIA'
  const tanggungan = 3
  const gajipokok = 25000000
  const status_akun = 'AKTIF'
  const nik = 53274507000099
  const npwp = 5552432335235
  const jabatan = 'pemilik'

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 12)

  try {
    // Create the user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        userType,
        alamat,
        telepon,
        jeniskelamin,
        tanggungan,
        gajipokok,
        status_akun,
        nik,
        npwp,
        jabatan,
      },
    })

    console.log('User created:', user)
  } catch (error) {
    console.error('Error creating user:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
