import {createBrowserRouter} from 'react-router-dom'
import Index from '../pages/Index'
import Signin from '../pages/Signin'
import Signup from '../pages/Signup'

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Index />
    },
    {
        path: "/signin",
        element: <Signin />
    },
    {
        path: "/signup",
        element: <Signup />
    },
])