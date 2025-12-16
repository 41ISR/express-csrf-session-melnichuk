import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import useSessionStore from "../store/useSessionStore"

export default function Index () {
    const { user } = useSessionStore()
    const [click, setClick] = useState(0)
    const formRef = useRef(null)
    const navigate = useNavigate()
    const clickRef = useRef(null)

    useEffect(() => {
        setClick(user.user.clicks)
    },[user])
    useEffect(() => {
        const interval = setInterval(() => {
            formRef.current && handleSubmit()
        }, 5000);        
        
        return () => clearInterval(interval)
    },[])
    useEffect(() => {
        clickRef.current = click
    },[click])

    const handleClick = () => {
        setClick((val) => val+1)
    }

    const handleSubmit = async () => {
        // console.log(clickRef);
        const clicks = {
            click: clickRef.current
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
                <div className="clicks-display">{click}</div>
                <form action={(e) => e.preventDefault} ref={formRef}>
                    <button type="submit" className="click-button" onClick={handleClick}>👆 КЛИКНИ!</button>
                </form>
                </div>

                <div className="leaderboard">
                <h2>🏆 Топ-10 игроков</h2>
                <ol>
                    <li>
                    <span className="rank">#1</span>
                    <span className="username">bob</span>
                    <span className="score">200 кликов</span>
                    </li>
                    <li>
                    <span className="rank">#2</span>
                    <span className="username">alice</span>
                    <span className="score">150 кликов</span>
                    </li>
                    <li className="current-user">
                    <span className="rank">#3</span>
                    <span className="username">you</span>
                    <span className="score">42 клика</span>
                    </li>
                    <li>
                    <span className="rank">#4</span>
                    <span className="username">charlie</span>
                    <span className="score">75 кликов</span>
                    </li>
                </ol>
                </div>

            </div>
        </div>
    )
}