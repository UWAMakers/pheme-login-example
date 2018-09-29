# UWA Pheme Login Example
This is example code on how to login using the makers login endpoint.

The actual way to login a user with pheme is complicated, annoying, and is a little open to exploitation. 
At the same time, giving people the ability to add pheme auth into applications allows people to create
cool things and eventually innovate.

As a result, Makers provides an open endpoint to validate pheme credentials that abstracts the actual process. 
However, we will **not** release the code for the endpoint itself.

#### [API Docs](https://uwasystemhealth.github.io/pheme-auth/)

## Registering 

You need to register for an API token for your project in order to use this api, simply:
1. Go to https://auth.uwamakers.com and login with your pheme. 
2. From the main menu, click `+` to add a new application
3. Give it a name.
4. Click `Add`. (You should see the new API key listed)
5. Click the copy button to copy the token.

The API token can either be passed through as `token` in the request body, or in the Authorization header (https://<API_Token>@auth.uwamakers.com). 

You should create a new token for each application you create.

**DO NOT COMMIT THE TOKEN TO GITHUB!!!** (use something like [dotenv](https://github.com/motdotla/dotenv).)

## Rate Limiting

Whilst the endpoint does employ rate limiting, it does so based on your entire application, not per user. If someone tries to brute force through your application, it will prevent others from using it.

TLDR: You should employ your own rate limiting inside your app.

## Examples

Examples are available in the following languages:

- [Node.js](./examples/node/)

## How to use the endpoint

**If you are using this endpoint, you MUST NOT store the users password in your database.**

Pretty simple:

1. Make a `POST` request with a body containing the following JSON:
    ```json
    {
      "user": "12345678",
      "pass": "SuperSecretPassword",
      "token": "abc123"
    }
    ```
2. Send the request to `https://auth.makeuwa.com/api/login`

3. You will get one of two responses:

   - `"success": true` when the login credentials are valid, and the response will look like this:
        ```json
        {
            "success": true,
            "user": {
                "username": "12345678",
                "mail": "12345678@student.uwa.edu.au",
                "fullname": "Jo Smith",
                "firstname": "Jo",
                "surname": "Smith"
            }
        }
        ```
        This contains a `user` field, that lists all the users details.
        
   - `"success": false` when the login credentials are invalid, and the response will look like this:
        ```json
        {
            "success": false,
            "message": "Invalid username or password provided."
        }
        ```
        This contains a `message` field, that contains a user-friendly error message to pass forward.
        
That's it!


[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/81dc1e750afff5cc3774)

## ToDo
The following are things planned 

  - [x] Add API registration
  - [ ] Support student card login/registering
