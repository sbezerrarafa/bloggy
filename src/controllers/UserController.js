import User from '../models/User'

export const storeUser = async (request, response) => {
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
