import express from 'express'
import routes from './routes'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'

dotenv.config()

const server = express()
const port = process.env.PORT || 3000

mongoose.connect(
  `mongodb+srv://rafa:${process.env.DB_PASSWORD}@cluster0.l03hd.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
  { useNewUrlParser: true.valueOf, useUnifiedTopology: true }
)

server.use(cors())
server.use(express.json())
server.use(routes)

server.listen(port, () => {
  console.log(`ei abestado tua api ta rodando http://localhost:${port}`)
})
