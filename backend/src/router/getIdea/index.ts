import { z } from 'zod'
import { t } from '../../lib/trpc'
import { ideas } from '../../lib/ideas'

export const getIdeaTrpcRoute = t.procedure
    .input(
      z.object({
        ideaNick: z.string(),
      })
    )
    .query(({ input }) => {
      const idea = ideas.find((idea) => idea.nick === input.ideaNick)
      // if (!idea) throw new Error(`Idea ${input.ideaNick} not found`)
      return { idea: idea || null }
    })