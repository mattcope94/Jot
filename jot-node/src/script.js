const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

async function main() {
    
    const notes = prisma.note.findMany()
    console.log(notes)
  }

main()
  .catch(e => {
    throw e
  })
 
  .finally(async () => {
    await prisma.$disconnect()
  })