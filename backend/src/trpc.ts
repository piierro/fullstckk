import { initTRPC } from '@trpc/server'

const ideas = [
  {
    nick: 'testacc',
    name: 'idea',
    desc: 'effqeeq',
  },
  {
    nick: 'fbdn',
    name: 'idea2',
    desc: 'fweffwe...',
  },
]

const t = initTRPC.create()

export const trpcRouter = t.router({
  getIdeas: t.procedure.query(() => {
    return { ideas }
  }),
})

export type TrpcRouter = typeof trpcRouter
