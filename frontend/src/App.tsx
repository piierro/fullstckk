import { TrpcProvider } from './lib/trpc'
import { AllIdeas } from './pages/AllIdeasPages'

export const App = () => {
  return (
    <TrpcProvider>
      <AllIdeas />
    </TrpcProvider>
  )
}
