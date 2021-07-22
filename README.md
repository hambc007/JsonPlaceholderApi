# JsonPlaceholderApi
Cypress Framework to validate email format:
1-find a specific user ( on the process validate that users have valid email format)
2-find the posts created for that specific user and validate each comments email format.

Also tests Added:
1-validate when posting a user with invalid email, the user is not created, 400 status code 
1-validate when posting a comment with invalid email, the comment is not created, 400 status code

Installing needed dependecies:
Run the command  **npm install**

Running Cypress test: 
To open the cypress UI type **npm run cypress:open**
To run the tests type **npm run cypress:run**
To view results from the test on local mocha report run **npm run report:generate**

CircleCI Cypress test:
To View the reports from each build check the artifacts and open the mochawesome html report for more details
