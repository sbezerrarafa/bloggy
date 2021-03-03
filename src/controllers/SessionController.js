import bcrypt from 'bcrypt'
import User from '../models/User'
import jwt from 'jsonwebtoken'

class SessionController {
  async store(request, response) {
    const { email, password } = request.body

    const user = await User.findOne({ email })

    if (!user) {
      return response
        .status(401)
        .json({ error: 'ei, tem isso registrado aqui não visse.' })
    }

    if (!(await bcrypt.compare(password, user.password))) {
      // o user.password é parte já criptografada, e o password
      //é a parte normal que pega no body

      return response.status(401).json({ error: 'senha errada ' })
    }

    const { id, name } = user
    return response.status(200).json({
      user: {
        id,
        name,
        email,
      },

      token: jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRATION,
        //expiresIn é para marcar quanto tempo a chave do token vai ser expirada
      }),
    })
  }
}

export default new SessionController()
