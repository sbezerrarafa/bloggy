import express from 'express'

const server = express()
const port = process.env.PORT || 3000

server.use(express.json())

server.listen(port, () => {
  console.log(`ei abestado tua api ta rodando http://localhost:${port}`)
})
