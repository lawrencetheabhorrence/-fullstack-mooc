import React from 'react'
import Togglable from './Togglable'
const Blog = ({ user, blog, updateBlog, deleteBlog }) => {
  const visibleRemove = { display : (user.username === blog.user.username) ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = () => {
    const newLikes = blog.likes + 1
    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: newLikes,
      user: blog.user,
    }
    updateBlog(blog.id, blogObject)
  }

  const handleDelete = () => {
    if (window.confirm(`Do you want to delete ${blog.title} by ${blog.author}?`)) deleteBlog(blog.id)
  }

  const urlDisplay = {display: blog.url ? '' : 'none'}
  const likesDisplay = {display: blog.likes > 0 ? '' : 'none'}


  return (
    <div style={blogStyle}>
      <p className= 'titleAuthor'>title, author: {blog.title}, {blog.author}</p>
      <Togglable buttonLabel="view">
        <p style={urlDisplay} className='url'>url: {blog.url}</p>
        <p style={likesDisplay} className='likes'>likes: {blog.likes}</p>
        <button onClick={handleLike} className='likeButton'>like</button>
        <button style={visibleRemove} onClick={handleDelete} className='deleteButton'>remove</button>
      </Togglable>
    </div>
  )
}

export default Blog
