# UWA Pheme Login Example
This is example code on how to login using the makers login endpoint.

The actual way to login a user with pheme is complicated, annoying, and is a little open to exploitation. 
At the same time, giving people the ability to add pheme auth into applications allows people to create
cool things and eventually innovate.

As a result, Makers provides an open endpoint to validate pheme credentials that abstracts the actual process. 
However, we will **not** release the code for the endpoint itself.

## Examples

Examples are available in the following languages:

- [Node.js](./examples/node/)

## How to use the endpoint

**If you are using this endpoint, please do not store the users password in your database.**

Pretty simple:

1. Make a `POST` request with a body containing the following JSON:
    ```json
    {
      "user": "12345678",
      "pass": "SuperSecretPassword"
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


[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/a4b924ff31c6aec3b62c)