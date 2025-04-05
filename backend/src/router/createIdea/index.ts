import { t } from '../../lib/trpc'
import { ideas } from '../../lib/ideas'
import { zCreateIdeaTrpcInput } from './input'

export const createIdeaTrpcRoute = t.procedure
  .input(
    zCreateIdeaTrpcInput
  )
  .mutation(({ input }) => {
    ideas.unshift(input)
    return true
  })