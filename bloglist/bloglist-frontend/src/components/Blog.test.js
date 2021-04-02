import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders title and author by default', () => {
  // checks that Blog renders the blog's title and author,
  // but not its url or likes by default

  const user = {
    id: 'aaa',
    username: 'Tester'
  }

  const blog = {
    title: 'The Title',
    author: 'The Creator',
    user: {
      id: 'aaa',
      username: 'Tester'
    }
  }

  const component = render(<Blog user={user} blog={blog} />)

  const titleAuthor = component.container.querySelector('.titleAuthor')

  expect(titleAuthor).toHaveTextContent('title, author: The Title, The Creator')

  const url = component.container.querySelector('.url')
  const likes = component.container.querySelector('.likes')

  expect(url).toHaveStyle('display: none')
  expect(likes).toHaveStyle('display: none')

})

test('url and likes are displayed after button click', () => {

  const user = {
    id: 'aaa',
    username: 'Tester'
  }

  const blog = {
    title: 'The Title',
    author: 'The Creator',
    likes: 6,
    url: 'thesite.com',
    user: {
      id: 'aaa',
      username: 'Tester'
    }
  }

  const mockHandler = jest.fn()

  const component = render(<Blog user={user} blog={blog} />)

  const button = component.getByText('view')
  fireEvent.click(button)

  const url = component.container.querySelector('.url')
  const likes = component.container.querySelector('.likes')

  expect(url).not.toHaveStyle('display: none')
  expect(likes).not.toHaveStyle('display: none')

  expect(url).toHaveTextContent('url: thesite.com')
  expect(likes).toHaveTextContent('likes: 6')

})

test('clicking the like button twice calls it twice', () => {
  const user = {
    id: 'aaa',
    username: 'Tester'
  }

  const blog = {
    title: 'The Title',
    author: 'The Creator',
    likes: 6,
    url: 'thesite.com',
    user: {
      id: 'aaa',
      username: 'Tester'
    }
  }

  const mockHandler = jest.fn()

  const component = render(<Blog user={user} blog={blog} updateBlog={mockHandler}/>)
  const button = component.getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})

