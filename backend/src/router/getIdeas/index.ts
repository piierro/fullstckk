import _ from 'lodash'
import { t } from '../../lib/trpc'

export const getIdeasTrpcRoute = t.procedure.query(async ({ ctx }) => {
  const ideas = await ctx.prisma.idea.findMany({
    select: {
      id: true,
      nick: true,
      name: true,
      description: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return { ideas }
})
