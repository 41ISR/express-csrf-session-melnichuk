import { useEffect } from "react"
import useAppStore from "../store/useAppStore"
import useSessionStore from "../store/useSessionStore"
import { useState } from "react"

export default function Leaderboard() {
    const {leaderboard, setLeaderboard} = useAppStore()
    const {user} = useSessionStore()
    
    const updBoard = async () => {
        try {
            const data = await fetch("https://super-invention-wrg65pj457jr3gwj-3000.app.github.dev/leaderboard", {
            method: "GET",
            headers:{
                "Content-Type": "application/json"
            },
            credentials: "include"
        })

        const res = await data.json()
        setLeaderboard(res)
        } catch (error) {
            console.error(error);
            
        }
    }


    useEffect(() => {
        updBoard()
        const interval = setInterval(() => {
            updBoard()
        }, 5000);        
        
        return () => clearInterval(interval)
    },[])
    
    return(
        <div className="leaderboard">
            <h2>🏆 Топ-10 игроков</h2>
            <ol>
                {leaderboard.map((el, index) => (
                    <li key={index} className={user.user.id == el.id ? 'current-user' : undefined}>
                        <span className="rank">#{index+1}</span>
                        <span className="username">{el.email}</span>
                        <span className="score">{el.clicks} кликов</span>
                    </li>
                ))}
            </ol>
        </div>
    )
}