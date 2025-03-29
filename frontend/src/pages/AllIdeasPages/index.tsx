import { trpc } from '../../lib/trpc'

export const AllIdeas = () => {
  const { data, error, isLoading, isFetching, isError } = trpc.getIdeas.useQuery()
  if (isLoading || isFetching) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }
  return (
    <div>
      <h1>All ideas</h1>
      {data?.ideas.map((idea) => {
        return (
          <div key={idea.nick}>
            <h1>{idea.nick}</h1>
            <h2>{idea.name}</h2>
            <p>{idea.desc}</p>
          </div>
        )
      })}
    </div>
  )
}
