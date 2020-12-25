
import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notif, setNotif] = useState('')
  const [isError, setIsError] = useState(false)

  const blogFormRef = useRef()
  const toggleRef = useRef()

  useEffect(() => {
    const getBlogs = async () => {
      const blogObjs = await blogService.getAll()
      setBlogs(blogObjs.sort((b1, b2) => b2.likes - b1.likes))
    }
    getBlogs()
  }, [])

  useEffect(() => {
      const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
      console.log(loggedUserJSON)
      if(loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        setUser(user)
        blogService.setToken(user.token)
      }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const userDets = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(userDets.token)
      setUser(userDets)

      setIsError(false)
      setNotif(`logged in as ${username}`)

      setTimeout(() => setNotif(null), 5000)

      setUsername('')
      setPassword('')
    } catch (exception) {
      setIsError(true)
      setNotif('Wrong credentials')

      setTimeout(() => setNotif(null), 5000)
    }
  }

  const createBlog = async (blog) => {
    const newBlog = await blogService.create(blog)
    setBlogs(blogs.concat(newBlog).sort((b1, b2) => b2.likes - b1.likes))

    blogFormRef.current.clearForm()
    toggleRef.current.toggleVisibility()

    setIsError(false)
    setNotif('a new blog was created')

    setTimeout(() => setNotif(null), 5000)
  }

  const updateBlog = async (id, blog) => {
    const updatedBlog = await blogService.update(id, blog)
    setBlogs(blogs.map(b => b.id === id ? updatedBlog : b).sort((b1, b2) => b2.likes - b1.likes))

    setIsError(false)
    setNotif('updated blog!')

    setTimeout(() => setNotif(null), 5000)
  }

  const deleteBlog = async (id) => {
    await blogService.deleteBlog(id)
    setBlogs(blogs.filter(b => b.id !== id).sort((b1, b2) => b2.likes - b1.likes))

    setIsError(false)
    setNotif('deleted blog!')

    setTimeout(() => setNotif(null), 5000)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input id='username' type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input id='password' type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)} />
      </div>
      <button id='login' type="submit">login</button>
    </form>
  )

  const blogForm = () => {
    return (
      <div>
        <Togglable buttonLabel="create blog" ref={toggleRef}>
          <BlogForm createBlog={createBlog} ref={blogFormRef}/>
        </Togglable>
      </div>
    )
  }

  const showBlogs = () => (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} user={user} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog}/>
      )}
    </div>
  )

  const logOut = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken('')
    setUser(null)

    setIsError(false)
    setNotif('logged out successfully')

    setTimeout(() => setNotif(null), 5000)
  }

  return (
    <div>
      <Notification message={notif} isError={isError}/>
      {user === null ? loginForm() :
        <div>
          <p>{user.name || user.username} logged-in <button onClick={logOut}>logout</button></p>
          <h2>create new</h2>
          {blogForm()}
          {showBlogs()}
        </div>
      }
    </div>
  )
}

export default App