import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useSessionStore from "../store/useSessionStore";


export default function Logout(){
    const navigate = useNavigate()
    const { clearSession } = useSessionStore()

    useEffect(() => {
        const goosebump = async () => {
            await fetch("https://super-invention-wrg65pj457jr3gwj-3000.app.github.dev/logout", {
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })

            clearSession()
        }

        goosebump()
        navigate("/signin")
    },[])

    return <></>
}