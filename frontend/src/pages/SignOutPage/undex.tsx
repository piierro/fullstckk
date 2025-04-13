import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { trpc } from '../../lib/trpc'
import { useEffect } from 'react'
import { getSignUpRoute } from '../../lib/routes'

export const SignOut = () => {
    const navigate = useNavigate()
    const trpcUtils = trpc.useContext();
    useEffect(() => {
        Cookies.remove('token')
        void trpcUtils.invalidate().then(() => {
            navigate(getSignUpRoute(), {replace:  true})
        })

    }, [])
    return <p>Loading...</p>
}