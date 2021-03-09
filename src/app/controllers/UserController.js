import User from '../models/User'
import bcrypt from 'bcrypt'

class UserController {
  async store(request, response) {
    const { name, email, password, bio, avatar } = request.body

    const isUserRegistered = await User.findOne({ email })

    if (isUserRegistered) {
      return response
        .status(409)
        .json({ error: 'já tem um caba registrado com este e-mail' })
    }

    const user = await User.create({
      name,
      email,
      password,
      bio,
      avatar,
    })
    let userResult = user.toObject()

    delete userResult['password']
    return response.status(201).json(userResult)
  }
  async update(request, response) {
    const { name, email, oldPassword, password, bio, avatar } = request.body

    const user = await User.findOne({ _id: request.userId })

    if (!user) {
      return response
        .status(404)
        .json({ error: 'Achei este usuario no servidor não em!!' })
    }
    if (oldPassword) {
      if (!(await bcrypt.compare(oldPassword, user.password))) {
        return response
          .status(400)
          .json({ error: ' a senha velha nao é igual' })
      }

      user.password = password
    }

    user.name = name
    user.email = email
    user.bio = bio
    user.avatar = avatar

    user.save()

    const { id, createdAt, updateAt } = user

    return response
      .status(201)
      .json({ id, name, email, bio, avatar, createdAt, updateAt })
  }
  async delete(request, response) {
    const user = await User.findOne({ _id: request.userId })

    if (!user) {
      return response.status(404).json({ error: 'User not found.' })
    }

    await User.deleteOne({ _id: request.userId })

    return response.status(200).json({ message: 'User deleted successfully.' })
  }
}

export default new UserController()
