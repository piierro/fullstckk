import { z } from 'zod'
import { t } from '../../lib/trpc'
import { ideas } from '../../lib/ideas'

export const getIdeaTrpcRoute = t.procedure
  .input(
    z.object({
      ideaNick: z.string(),
    })
  )
  .query(async ({ ctx, input }) => {
    const idea = await ctx.prisma.idea.findUnique({
      where: {
        nick: input.ideaNick,
      },
      include: {
        author: {
          select: {
            id: true,
            nick: true,
          },
        },
      },
    })

    return { idea }
  })
