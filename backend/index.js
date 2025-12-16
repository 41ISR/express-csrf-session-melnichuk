const cookieParser = require("cookie-parser")
const db = require("./db")
const express = require("express")
const cors = require("cors")
const bcrypt = require("bcrypt")
const session = require("express-session")

const app = express()

app.set("trust proxy", 1)                       // CODESPACE ONLY

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: true,                               // CODESPACE ONLY
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["set-cookie"]
}))
app.use(session({
    secret: "radekkohout",
    name: "sessionId",
    resavee: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge: 24*60*60*1000,
        // sameSite: "strict",  
        sameSite: "lax",            // CODESPACE ONLY
        secure: true,                // FALSE for localhost
        domain: undefined           // CODESPACE ONLY
    }
}))

app.post("/signup", (req, res) => {
    try {
        const hashed = bcrypt.hashSync(req.body.password, 10)
        const query = db.prepare(`
            INSERT INTO users (email, password) VALUES (?, ?)`)
        const info = query.run(req.body.email, hashed)
        const newUser = db.prepare(`
            SELECT id, email, clicks, createdAt FROM users WHERE id = ?`).get(info.lastInsertRowid)

        req.session.userId = newUser.id
        req.session.email = newUser.email
        req.session.clicks = newUser.clicks

        res.status(201).json({message: "user success", user: newUser})
    } catch (error) {
        console.error(error);
        res.status(400).json({error: "erroror"})
    }
})

app.post("/signin", (req, res) => {
    try {
        if(!req.body.email || !req.body.password) return res.status(403).json({error: "not all neccesary data provided"})
        const query = db.prepare(`
            SELECT * FROM users WHERE email = ?`)
        const user = query.get(req.body.email)
        if(!user) return res.status(401).json({error: "Wrong email or password"})
        if(!bcrypt.compareSync(req.body.password, user.password)) return res.status(401).json({error: "Wrong email or password"})
        
        req.session.userId = user.id
        req.session.email = user.email
        req.session.clicks = user.clicks

        res.status(201).json({message: "sign in success", user: user})
    } catch (error) {
        console.error(error);
        res.status(401).json({error: "erroror"})
    }
})

app.post("/logout", (req,res) => {
    req.session.destroy((err) => {
        err && res.status(500).json({error: "Couldn't log out :("})
        res.clearCookie("sessionId")
        res.status(200).json({message: "Log out successfully"})
    })
})

app.get("/me", (req, res) => {
    // console.log(req.session);
    if(req.session.userId) {        
        return res.json({loggedin: true, user: {userId: req.session.userId, email: req.session.email, clicks: req.session.clicks}})
    }
    
    return res.status(401).json({loggedin: false})
})

// ----------

app.post("/click", (req, res) => {
    const {click} = req.body
    const updClicks = db.prepare(`
        UPDATE users SET clicks = ? WHERE id = ?`).run(click, req.session.userId)

    res.status(200).json({message: "Clicked lol hahahahahaahahahahaha u're lox"})
})





app.listen("3000", () => {
    console.log("server's running on 3000");
    
})