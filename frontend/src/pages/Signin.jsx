
export default function Signin () {

    const handleLog = async (e) => {
        e.preventDefault()
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
                <h2>Вход</h2>
                <form onSubmit={handleLog}>
                    <input name="email" type="text" placeholder="Имя пользователя" required />
                    <input name="password" type="password" placeholder="Пароль" required />
                    <button type="submit">Войти</button>
                </form>
                </div>
            </div>
        </div>
    )
}