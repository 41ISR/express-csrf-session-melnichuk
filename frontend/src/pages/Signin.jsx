import { useState } from "react"
import { data, Link, useNavigate } from "react-router-dom"

export default function Signin () {
    const navigate = useNavigate()
    const [error, setError] = useState(undefined)
    const handleLog = async (e) => {
        e.preventDefault()
        setError(undefined)
        try {
            const user = {
                email: e.target.email.value,
                password: e.target.password.value
            }

            const res = await fetch("https://super-invention-wrg65pj457jr3gwj-3000.app.github.dev/signin", {
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

            <div className="forms">
                <div className="form-card">
                <h2>Вход</h2>
                <form onSubmit={handleLog}>
                    <input name="email" type="text" placeholder="Имя пользователя" required />
                    <input name="password" type="password" placeholder="Пароль" required />

                    {error && <p className="form-error">{error}</p>}

                    <button type="submit">Войти</button>
                </form>
                
                <Link className="form-link" to='/signup'>Регистрация</Link>
                </div>
            </div>
            
        </div>
    )
}