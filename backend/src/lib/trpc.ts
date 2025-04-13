import { type Express } from 'express'
import { type TrpcRouter } from '../router'
import { initTRPC, type inferAsyncReturnType } from '@trpc/server'
import { type AppContext } from './ctx'
import * as trpcExpress from '@trpc/server/adapters/express'
import { expressHandler } from 'trpc-playground/handlers/express'
import { type ExpressRequest } from '../utils/types'

const getCreateTrpcContext =
  (appContext: AppContext) =>
  ({ req }: trpcExpress.CreateExpressContextOptions) => ({
    ...appContext,
    me: (req as ExpressRequest).user || null,
  })

type TrpcContext = inferAsyncReturnType<ReturnType<typeof getCreateTrpcContext>>

export const t = initTRPC.context<TrpcContext>().create()

export const applyTrpcToExpressApp = async (expressApp: Express, appContext: AppContext, trpcRouter: TrpcRouter) => {
  expressApp.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
      router: trpcRouter,
      createContext: getCreateTrpcContext(appContext),
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
