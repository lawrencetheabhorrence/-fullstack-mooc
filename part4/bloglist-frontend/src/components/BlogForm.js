import React, { useState, useImperativeHandle } from 'react'

const BlogForm = React.forwardRef((props, ref) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const blog = { title, author, url }
    props.createBlog(blog)
  }

  const clearForm = () => {
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  useImperativeHandle(ref, () => {
    return { clearForm }
  })

  return (
    <div>
      <form onSubmit={handleSubmit} className="formDiv">
        <div>
            title:
          <input id='titleField' type="text" value={title} name="Title" onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
            author:
          <input id='authorField' type="text" value={author} name="Author" onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
            url:
          <input id='urlField' type="text" value={url} name="Url" onChange={({ target }) => setUrl(target.value)} />
        </div>
        <button id='createBlog' type="submit">create</button>
      </form>
    </div>
  )
})

BlogForm.displayName = 'BlogForm'

export default BlogForm