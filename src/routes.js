import express from 'express'

const routes = express.Router()

routes.get('/', (request, response) => {
  response.status(200).json('mas oiiaaa tá rodando')
})

export default routes
