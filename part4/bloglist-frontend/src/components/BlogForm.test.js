import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<Blog /> updates parent state and calls handleSubmit', () => {
  const createBlog = jest.fn()

  const component = render(<BlogForm createBlog={createBlog} />)

  const title = component.container.querySelector('#titleField')
  const author = component.container.querySelector('#authorField')
  const url = component.container.querySelector('#urlField')
  const form = component.container.querySelector('form')

  fireEvent.change(title, { target: { value: 'This is a new blog' } })
  fireEvent.change(author, { target: { value: 'This is a new author' } })
  fireEvent.change(url, { target: { value: 'This is a new url' } })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('This is a new blog')
  expect(createBlog.mock.calls[0][0].author).toBe('This is a new author')
  expect(createBlog.mock.calls[0][0].url).toBe('This is a new url')
})