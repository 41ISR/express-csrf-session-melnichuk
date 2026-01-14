import { useEffect, useRef} from "react"
import { useNavigate } from "react-router-dom"
import useSessionStore from "../store/useSessionStore"
import useAppStore from "../store/useAppStore"
import Leaderboard from "../components/Leaderboard"

export default function Index () {
    const { user, csrfToken, getToken } = useSessionStore()
    const formRef = useRef(null)
    const navigate = useNavigate()

    const {currentClicks, setCurrentClicks} = useAppStore()

    // --

    useEffect(() => {
        setCurrentClicks(user.user.clicks)
    },[user])

    useEffect(() => {
        getToken()
        const interval = setInterval(() => {
            formRef.current && handleSubmit()
        }, 5000);        
        
        return () => clearInterval(interval)
    },[])

    // --

    const handleClick = () => {
        setCurrentClicks(currentClicks + 1)
    }

    const handleSubmit = async () => {
        try {
            await fetch('https://super-invention-wrg65pj457jr3gwj-3000.app.github.dev/click',{
                body: JSON.stringify({click: useAppStore.getState().currentClicks}),
                method: "POST",
                headers:{
                    "X-CSRF-TOKEN": useSessionStore.getState().csrfToken,
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })
        } catch (error) {
            console.error(error);
        }
    }



    return (
        <div className="container">
            <div className="header">
                <h1>🎮 Кликер Игра</h1>
                <div className="user-info">
                <span><strong>{user.user.email}</strong></span>
                <button className="logout-btn" onClick={() => {handleSubmit(); navigate("/logout")}}>Выйти</button>
                </div>
            </div>

            <div className="error" style={{display: "none"}}>
                Текст ошибки
            </div>

            <div className="game-area">
                
                <div className="click-counter">
                <h2>Твои клики</h2>
                <div className="clicks-display">{currentClicks}</div>
                <form action={(e) => e.preventDefault} ref={formRef}>
                    <button type="submit" className="click-button" onClick={handleClick}>👆 КЛИКНИ!</button>
                </form>
                </div>

                <Leaderboard />
            </div>
        </div>
    )
}