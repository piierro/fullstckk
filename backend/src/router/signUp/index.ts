import crypto from 'crypto'
import { t } from '../../lib/trpc'
import { zSignUpTrpcInput } from './input'
import { getPasswordHash } from '../../utils/getPasswordHash'

export const signUpTrpcRoute = t.procedure.input(zSignUpTrpcInput).mutation(async ({ ctx, input }) => {
  const exUser = await ctx.prisma.user.findUnique({
    where: {
      nick: input.nick,
    },
  })
  if (exUser) {
    throw new Error('User with this nick already exists')
  }
  await ctx.prisma.user.create({
    data: {
      nick: input.nick,
      password: getPasswordHash(input.password),
    },
  })
  return true
})
