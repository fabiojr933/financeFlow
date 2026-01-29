import { PrismaClient, PlanType } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed de planos...')

  const plans = [
    {
      type: PlanType.FREE,
      amount: 0
    },
    {
      type: PlanType.GOLD,
      amount: 49.9
    }
  ]

  for (const plan of plans) {
    await prisma.plan.upsert({
      where: { type: plan.type },
      update: {
        amount: plan.amount
      },
      create: plan
    })
  }

  console.log('✅ Planos FREE e GOLD criados com sucesso!')
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
