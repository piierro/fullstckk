import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { TrpcProvider } from './lib/trpc'
import { AllIdeas } from './pages/AllIdeasPages'
import { ViewIdeaPage } from './pages/ViewIdeaPage'
import * as routes from './lib/routes'
import { Layout } from './components/Layout'
import './styles/global.scss'
import { NewIdea } from './pages/NewIdeaPage'
import { SignUp } from './pages/SignUpPage'
import { SignIn } from './pages/SignInPage'
import { SignOut } from './pages/SignOutPage/undex'
import { EditIdeaPage } from './pages/EditIdeaPage'

export const App = () => {
  return (
    <TrpcProvider>
      <BrowserRouter>
        <Routes>
          <Route path={routes.getSignOutRoute()} element={<SignOut />} />
          <Route element={<Layout />}>
            <Route path={routes.getSignUpRoute()} element={<SignUp />} />
            <Route path={routes.getSignInRoute()} element={<SignIn />} />
            <Route path={routes.getAllIdeasRoute()} element={<AllIdeas />} />
            <Route path={routes.getNewIdeaRoute()} element={<NewIdea />} />
            <Route path={routes.getViewIdeaRoute(routes.viewIdeaRouteParams)} element={<ViewIdeaPage />} />
             <Route path={routes.getEditIdeaRoute(routes.editIdeaRouteParams)} element={<EditIdeaPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TrpcProvider>
  )
}
