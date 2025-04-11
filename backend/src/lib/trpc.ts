import { initTRPC } from '@trpc/server'
import { type Express } from 'express'
import { type TrpcRouter } from '../router'
import { type AppContext } from './ctx'
import * as trpcExpress from '@trpc/server/adapters/express'
import { expressHandler } from 'trpc-playground/handlers/express'

export const t = initTRPC.context<AppContext>().create()

export const applyTrpcToExpressApp = async (expressApp: Express, appContext: AppContext, trpcRouter: TrpcRouter) => {
  expressApp.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
      router: trpcRouter,
      createContext: () => appContext,
    })
  )

  expressApp.use(
    '/trpc-playground',
    await expressHandler({
      trpcApiEndpoint: '/trpc',
      playgroundEndpoint: '/trpc-playground',
      router: trpcRouter,
    })
  )
}
