import express from "express"
import mongoose from 'mongoose'
import cors from "cors"
import userRouter from './routes/user.js'
import dotenv from 'dotenv'

const app = express()
dotenv.config()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())

app.use('/user', userRouter)

app.get('/', (req, res) => {
    res.send('Hello to weather app backend')
})

const PORT = process.env.PORT || 5000
mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => app.listen(PORT, () => console.log(`Server running on ${PORT}`)))
    .catch((err) => console.log(err.message))

mongoose.set('useFindAndModify', false)