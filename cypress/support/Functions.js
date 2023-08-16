
export function validateEmail(email) {
  // using iregular expression to ensure we validating emails correctly
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
export function badRequest(response) {
  // Check that the response is a bad request
  cy.log('expect a bad request response')
  expect(response).property('status').to.be.equal(400)
}

export function testUserComments(Id) {
  cy.request('https://jsonplaceholder.typicode.com/posts?userId=' + Id)
    //Get all posts for the user
    .its('body')
    .then((posts) => {
      // yields the response for all posts by the user
      if (posts != null) {
        posts.forEach((post) => {
          cy.request('https://jsonplaceholder.typicode.com/posts/' + post.id + '/comments')
            //Get all comments for each user post
            .its('body')
            .then((comments) => {
              if (comments != null) {
                cy.log('validate emails format')
                comments.forEach((comment) => {
                  expect(validateEmail(comment.email)).to.be.true;
                })
              }
              else
                cy.log('No comments available to validate')
            })
        })
      }
      else
        cy.log('No posts available to validate')
    })
}
export function getUserId(users, username) {
  let id
  cy.log('validate emails format and find user')
  if (users != null) {
    users.forEach((user) => {
      //Validate the emails format for all users
      expect(validateEmail(user.email)).to.be.true;
      //Get the User Id for the needed username  
      if (user.username == username) {
        id = user.id;
      }
    })
    return id;
  }
}

