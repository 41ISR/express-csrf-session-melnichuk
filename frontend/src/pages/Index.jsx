import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Index () {
    const [click, setClick] = useState(0)
    const navigate = useNavigate()
    return (
        <div className="container">
      
            <div className="header">
                <h1>🎮 Кликер Игра</h1>
                <div className="user-info">
                <span><strong>Имя пользователя</strong></span>
                <button className="logout-btn" onClick={() => navigate("/logout")}>Выйти</button>
                </div>
            </div>

            <div className="error" style={{display: "none"}}>
                Текст ошибки
            </div>

            <div className="game-area">
                
                <div className="click-counter">
                <h2>Твои клики</h2>
                <div className="clicks-display">{click}</div>
                <button className="click-button" onClick={() => setClick((val) => val+1)}>👆 КЛИКНИ!</button>
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