import { initTRPC } from '@trpc/server'
import _ from 'lodash'
import { z } from 'zod'

const ideas = _.times(100, (i) => ({
  nick: `testacc-${i}`,
  name: `Idea ${i}`,
  desc: `DESC ${i}`,
  text: _.times(100, (j) => `<p>Text ${j} of idea ${i}...</p>`).join(''),
}))

const t = initTRPC.create()

export const trpcRouter = t.router({
  getIdeas: t.procedure.query(() => {
    return { ideas: ideas.map((idea) => _.pick(idea, ['nick', 'name', 'desc'])) }
  }),
  getIdea: t.procedure
    .input(
      z.object({
        ideaNick: z.string(),
      })
    )
    .query(({ input }) => {
      const idea = ideas.find((idea) => idea.nick === input.ideaNick)
      // if (!idea) throw new Error(`Idea ${input.ideaNick} not found`)
      return { idea: idea || null }
    }),
})

export type TrpcRouter = typeof trpcRouter
