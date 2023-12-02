# Eateria Management - SE104

## Nodejs

This template provides a minimal setup to run server with nodejs.

## Development

### Clone code

To clone code from git repo, use this command:

```shell
git clone https://github.com/trungpd0911/se104_eaterial_be.git
```

After clone code successfully, use this command to install essential packages:

```shell
npm install
```

Create a .env file in the project root based on the provided .env.example file. This file will contain sensitive information such as database credentials. Replace the placeholder values with your actual database details.

### Run code

Use this command to run code in dev environment:

```shell
npm start
```

## Folder Structure

- routes
    - define the endpoints and URL paths of your API or web application.
    - It specifies how incoming HTTP requests are mapped to specific controller functions
- controllers
    - contain the logic that handles the business or application-specific operations for each route
- services
    - contain business logic, data manipulation, or external service integrations that are used by multiple controllers or other parts of your application.
- middlewares
    - intercept and process requests and responses as they flow through the application
- config
    - holds configuration files and settings for your application
- __tests__
    - this folder is use for test this server using jest and supertest

## api-docs
- This API is built using Swagger UI for easy exploration and testing.
- https://trungpd0911.github.io/swaggerUI-SE104/

## Deploy
- this server is deployed in onrender 
- this is link of the server : https://se104-eateria.onrender.com