import { t } from '../../lib/trpc'
import { getPasswordHash } from '../../utils/getPasswordHash'
import { zSignInTrpcInput } from './input'

export const signInTrpcRoute = t.procedure.input(zSignInTrpcInput).mutation(async ({ ctx, input }) => {
  const user = await ctx.prisma.user.findFirst({
    where: {
      nick: input.nick,
      password: getPasswordHash(input.password),
    },
  })
  if (!user) {
    throw new Error('Wrong nick or password')
  }
  return true
})
