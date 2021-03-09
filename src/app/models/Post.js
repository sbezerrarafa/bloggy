import { Schema, model } from 'mongoose'

const PostSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  subtitle: String,
  tags: String,
  cover: {
    type: String,
    required: true,
  },
  content: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
})

export default model('Post', PostSchema)
