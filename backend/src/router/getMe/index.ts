import _ from 'lodash'
import { t } from '../../lib/trpc'

export const getMeTrpcRoute = t.procedure.query(({ ctx }) => {
  return { me: ctx.me && _.pick(ctx.me, ['id', 'nick']) }
})
