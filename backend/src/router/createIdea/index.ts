import { t } from '../../lib/trpc'
import { ideas } from '../../lib/ideas'
import { zCreateIdeaTrpcInput } from './input'

export const createIdeaTrpcRoute = t.procedure.input(zCreateIdeaTrpcInput).mutation(({ input }) => {
  if (ideas.find((idea) => idea.nick === input.nick)) {
    throw Error('Idea with this nick already exists')
  }
  ideas.unshift(input)
  return true
})
