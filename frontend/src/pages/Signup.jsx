import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"

export default function Signup () {
    const navigate = useNavigate()
    const [error, setError] = useState()
    const handleReg = async (e) => {
        e.preventDefault()
        try {
            const user = {
                email: e.target.email.value,
                password: e.target.password.value
            }

            const res = await fetch("https://super-invention-wrg65pj457jr3gwj-3000.app.github.dev/signup", {
                body: JSON.stringify(user),
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })
            const dada = await res.json()

            if (!res.ok) throw new Error(dada.error)
                
            navigate("/")
        } catch (error) {
            console.error(error);
            setError(error.message)
        }
    }

    return (
        <div className="container">

            <h1>🎮 Кликер Игра</h1>
            <p className="subtitle">Демонстрация CSRF + CORS + Sessions</p>

            <div className="error" style={{display: "none"}}>
                Текст ошибки
            </div>

            <div className="forms">
                <div className="form-card">
                <h2>Регистрация</h2>
                <form onSubmit={handleReg}>
                    <input type="text" name="email" placeholder="Имя пользователя" required />
                    <input type="password" name="password" placeholder="Пароль (мин. 6 символов)" required />
                    
                    {error && <p className="form-error">{error}</p>}
                    
                    <button type="submit">Зарегистрироваться</button>
                </form>
                
                <Link className='form-link' to='/signin'>Вход</Link>
                </div>

                
            </div>
            
        </div>
    )
}