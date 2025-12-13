import { Outlet, useNavigate } from "react-router-dom"
import useSessionStore from "../store/useSessionStore"
import { useEffect, useState } from "react"

export default function AuthProvider(){
    const { user, checkSession } = useSessionStore()
    const navigate = useNavigate()
    const [isChecked, setIsChecked] = useState(false)

    useEffect(() => {
        const totya3 = async () => {
            try {
                await checkSession()
                setIsChecked(true)
            } catch (error) {
                console.error(error);
                setIsChecked(true)
            }
        }
        totya3()
    }, [setIsChecked])

    useEffect(() => {
        if(!user && isChecked) navigate('/signin')
    }, [setIsChecked, user, navigate])

    if(!user || !isChecked) return <></>

    return <Outlet />
}