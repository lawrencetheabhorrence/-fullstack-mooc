describe('Bloglist app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login page is first displayed', function () {
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login').click()
      cy.contains('Matti Luukkainen logged-in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrongpass')
      cy.get('#login').click()
      cy.get('.error').should('contain', 'Wrong credentials')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })

    describe('When logged in', function () {
      beforeEach(function() {
        cy.login({ username: 'mluukkai', password: 'salainen' })
      })

      it('A blog can be created', function () {
        cy.get('.show').click()
        cy.get('#titleField').type('First blog')
        cy.get('#authorField').type('First author')
        cy.get('#urlField').type('first.com')
        cy.get('#createBlog').click()
        cy.get('.titleAuthor').contains('title, author: First blog, First author')
        cy.contains('view').click()
        cy.contains('url: first.com')
      })

      describe('When a blog is created', function () {
        beforeEach(function() {
          cy.createBlog({
            title: 'First blog',
            author: 'First author',
            url: 'first.com',
            likes: 0
          })
        })

        it('A blog can be liked', function ()  {
          cy.contains('view').click()
          cy.get('.likeButton').click()
          cy.contains('likes: 1')
        })

        it('A blog can be deleted', function () {
          cy.contains('view').click()
          cy.get('.deleteButton').click()
          cy.should('not.contain', 'First blog')
        })

        it('The blog of another user cannot be deleted', function () {
          const user = {
            name: 'Testing User',
            username: 'tester',
            password: 'test'
          }
          cy.request('POST', 'http://localhost:3001/api/users/', user)
          cy.login({ username: 'tester', password: 'test' })
          cy.visit('http://localhost:3000')

          cy.contains('view').click()
          cy.should('not.contain', 'remove')
        })

        it('Blogs are sorted according to likes', function () {
          cy.createBlog({ author: 'aa', title: 'bb', url: 'cc', likes: 5 })
          cy.createBlog({ author: 'aa', title: 'bb', url: 'cc', likes: 2})
          cy.createBlog({ author: 'aa', title: 'bb', url: 'cc', likes: 10})
          cy.createBlog({ author: 'aa', title: 'bb', url: 'cc', likes: 20})
          cy.createBlog({ author: 'aa', title: 'bb', url: 'cc', likes: 7})
          cy.visit('http://localhost:3000')
          cy.contains('view').click()

          cy.get('.likes').eq(0).contains('likes: 20')
          cy.get('.likes').eq(1).contains('likes: 10')
          cy.get('.likes').eq(2).contains('likes: 7')
          cy.get('.likes').eq(3).contains('likes: 5')
          cy.get('.likes').eq(4).contains('likes: 2')

        })
      })
    })
  })

})