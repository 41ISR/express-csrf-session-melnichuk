import {createBrowserRouter} from 'react-router-dom'
import Index from '../pages/Index'
import Signin from '../pages/Signin'
import Signup from '../pages/Signup'
import AuthProvider from '../components/AuthProvider'
import Logout from '../pages/Logout'

export const router = createBrowserRouter([
    {
        path: "/",
        element: <AuthProvider />,
        children: [
            {
                index: true,
                element: <Index />
            }
        ]
    },
    {
        path: "/signin",
        element: <Signin />
    },
    {
        path: "/signup",
        element: <Signup />
    },
    {
        path: "/logout",
        element: <Logout />
    },
])