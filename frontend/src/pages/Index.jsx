import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import useSessionStore from "../store/useSessionStore"
import useAppStore from "../store/useAppStore"
import Leaderboard from "../components/Leaderboard"

export default function Index () {
    const { user } = useSessionStore()
    // const [click, setClick] = useState(0)
    const formRef = useRef(null)
    const navigate = useNavigate()
    // const clickRef = useRef(null)

    const {currentClicks, setCurrentClicks} = useAppStore()

    useEffect(() => {
        setCurrentClicks(user.user.clicks)
    },[user])
    useEffect(() => {
        const interval = setInterval(() => {
            formRef.current && handleSubmit()
        }, 5000);        
        
        return () => clearInterval(interval)
    },[])
    // useEffect(() => {
    //     clickRef.current = click
    // },[click])

    const handleClick = () => {
        setCurrentClicks(currentClicks + 1)
    }

    const handleSubmit = async () => {
        // console.log(clickRef);
        const clicks = {
            click: currentClicks
        }
        try {
            await fetch('https://super-invention-wrg65pj457jr3gwj-3000.app.github.dev/click',{
                body: JSON.stringify(clicks),
                method: "POST",
                headers:{
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