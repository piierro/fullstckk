import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { TrpcProvider } from './lib/trpc'
import { AllIdeas } from './pages/AllIdeasPages'
import { ViewIdeaPage } from './pages/ViewIdeaPage'
import * as routes from './lib/routes'
import { Layout } from './components/Layout'
import './styles/global.scss'
import { NewIdea } from './pages/NewIdeaPage'

export const App = () => {
  return (
    <TrpcProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path={routes.getAllIdeasRoute()} element={<AllIdeas />} />
            <Route path={routes.getNewIdeaRoute()} element={<NewIdea />} />
            <Route path={routes.getViewIdeaRoute(routes.viewIdeaRouteParams)} element={<ViewIdeaPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TrpcProvider>
  )
}
