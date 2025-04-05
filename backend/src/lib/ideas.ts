import _ from 'lodash'

export const ideas = _.times(100, (i) => ({
  nick: `testacc-${i}`,
  name: `Idea ${i}`,
  description: `DESC ${i}`,
  text: _.times(100, (j) => `<p>Text ${j} of idea ${i}...</p>`).join(''),
}))
