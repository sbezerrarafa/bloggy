import Post from '../models/Post'
import User from '../models/User'

class PostController {
  async store(request, response) {
    const { title, subtitle, tags, cover, content } = request.body

    const post = await Post.create({
      title,
      subtitle,
      tags,
      cover,
      content,
      user: request.userId,
    })

    await post.save()

    const user = await User.findOne({ _id: request.userId })

    user.posts.push(post)
    await user.save()

    return response.status(201).json(post)
  }
  async index(request, response) {
    const posts = await Post.find()

    return response.status(200).json(posts)
  }
  async indexAll(request, response) {
    try {
      const posts = await Post.find({ _id: request.params.user_id })
      return response.status(200).json(posts)
    } catch (error) {
      return response.status(404).json({ erro: 'Posts not find for thats id' })
    }
  }

  async show(request, response) {
    try {
      const post = await Post.find({ _id: request.params.post_id })
      return response.status(200).json(post)
    } catch (error) {
      return response.status(404).json({ erro: 'Post not found' })
    }
  }
}

export default new PostController()
