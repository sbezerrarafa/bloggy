import { schema, model } from 'mongoose'

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    bio: String,
    avatar: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // isso aqui mostra o momento que foi modificado ou criado algo no banco
)

export default model('User', UserSchema)
