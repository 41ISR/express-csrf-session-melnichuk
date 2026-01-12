import useAppStore from "../store/useAppStore"

export default function Leaderboard() {
    const {leaderboard} = useAppStore()
    
    return(
        <div className="leaderboard">
            <h2>🏆 Топ-10 игроков</h2>
            <ol>
                {leaderboard.sort((a,b) => b.clicks - a.clicks).map((el, index) => (
                    <li>
                        <span className="rank">#{index+1}</span>
                        <span className="username">{el.email}</span>
                        <span className="score">{el.clicks} кликов</span>
                    </li>
                ))}
            </ol>
        </div>
    )
}