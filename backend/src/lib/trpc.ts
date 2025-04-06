import { initTRPC } from '@trpc/server'
import { type Express } from 'express'
import { type TrpcRouter } from '../router'
import * as trpcExpress from '@trpc/server/adapters/express'

export const t = initTRPC.create()

export const applyTrpcToExpressApp = (expressApp: Express, trpcRouter: TrpcRouter) => {
  expressApp.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
      router: trpcRouter,
    })
  )
}
