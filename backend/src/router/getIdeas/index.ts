import _ from 'lodash'
import { ideas } from '../../lib/ideas'
import { t } from '../../lib/trpc'

export const getIdeasTrpcRoute = t.procedure.query(() => {
  return { ideas: ideas.map((idea) => _.pick(idea, ['nick', 'name', 'description'])) }
})
