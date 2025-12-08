import { useNavigate } from "react-router-dom"

export default function Signup () {
    const navigate = useNavigate()
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

            if (!res.ok) throw new Error(res.message)
                
            navigate("/")
        } catch (error) {
            console.error(error);
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
                    <button type="submit">Зарегистрироваться</button>
                </form>
                </div>

                
            </div>
        </div>
    )
}