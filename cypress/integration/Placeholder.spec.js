const Functions = require("../support/Functions")

context('Api Tests to validate emails format', () => {
  it('Validate comments email format', () => {
    // first, let's find out the userId of the Delphine username
    let Id
    cy.request('https://jsonplaceholder.cypress.io/users')
      .its('body')
      .then((users) => {
      // yields the response object
        cy.log('validate emails format and find user Delphine')
        users.forEach(user => {
          expect(Functions.ValidateEmail(user.email)).to.be.true;
        //Get the User Id for Delphine username  
          if (user.username == 'Delphine') {
            Id=user.id;
          }
        });
      if(Id != null) { 
        cy.request('https://jsonplaceholder.typicode.com/posts?userId='+Id)
        //Get all posts for the user
          .its('body')
          .then((posts)=> {
            if(posts != null){ 
              posts.forEach(post => {
                cy.request('https://jsonplaceholder.typicode.com/posts/'+post.id+'/comments')
                //Get all comments for each user post
                  .its('body')
                  .then((comments)=> {
                    if(comments != null){  
                      cy.log('validate emails format') 
                      comments.forEach(comment => {
                        expect(Functions.ValidateEmail(comment.email)).to.be.true;
                      }) 
                    } else cy.log('No comments available to validate') })           
              });
            } 
            else 
              cy.log('No posts available to validate') })
      }
      else 
        cy.log('username is not availabe to validate') })      
  })
  it('validate posting a user with an invalid email',() => {
    cy.request('POST', 'https://jsonplaceholder.cypress.io/users', {       
      name: "Leanne Graham",
      username: "Bret",
      email: "Invalidemailformat<div>",      
    })
      .then((response) => {
        console.log(response)
        expect(response).property('status').to.not.equal(201) // new commment should not be created
      })
  })
  it('validate posting a comment with an invalid email',() => {
    cy.request('POST', 'https://jsonplaceholder.cypress.io/comments', {
      postId: 1,
      name: 'Cypress Test',
      email:"invalid emailformat",
      body: 'Fast, easy and reliable testing for anything that runs in a browser.',
    }) // save the new post from the response
      .then((response) => {
        console.log(response)
        expect(response).property('status').to.not.equal(201) // new commment should not be created
      })
  })
})