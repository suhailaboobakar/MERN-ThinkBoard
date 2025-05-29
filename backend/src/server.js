import express from 'express'
import notesRoutes from './routes/notesRoutes.js'
import { connectDB } from './config/db.js'
import dotenv from 'dotenv'
import rateLimiter from './middleware/rateLimiter.js'
import cors from 'cors'

dotenv.config()


const port = process.env.PORT || 5001
const app = express()



//middleware
app.use(cors({
    origin: 'http://localhost:5173', 
}
))
app.use(express.json()) // to parse JSON bodies
app.use(rateLimiter)


app.use("/api/notes" , notesRoutes)

connectDB().then(() => {
    app.listen(port , ()=> {
    console.log(`server is running on port ${port}`);
})
})



// 