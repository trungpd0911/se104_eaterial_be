# Eateria Management - SE104

## Nodejs

This template provides a minimal setup to run server with nodejs.

## Development

### Clone code

- To clone code from git repo, use this command:

```shell
git clone https://github.com/trungpd0911/se104_eaterial_be.git
```

- After clone code successfully, use this command to install essential packages:

```shell
npm install
```

- Create a MySQL database using XAMPP. You can download XAMPP from https://www.apachefriends.org/download.html.
- After opening Apache and MySQL, navigate to phpMyAdmin to create a new database. Save the database information in the .env file to allow the server to connect to your database.
- All tables and keys will be created after you run the server.

- Create a .env file in the project root based on the provided .env.example file. This file will contain sensitive information, such as database credentials. Replace the placeholder values with your actual database details.

### Run code

Use this command to run code in dev environment:

```shell
npm start
```

## Folder Structure

- routes
    - Define the endpoints and URL paths of your API or web application.
    - It specifies how incoming HTTP requests are mapped to specific controller functions
- controllers
    - Contain the logic that handles the business or application-specific operations for each route
- services
    - Contain business logic, data manipulation, or external service integrations that are used by multiple controllers or other parts of your application.
- middlewares
    - Intercept and process requests and responses as they flow through the application
- config
    - Holds configuration files and settings for your application
- __tests__
    - This folder is use for test this server using jest and supertest

## api-docs
- This API is built using Swagger UI for easy exploration and testing.
- https://trungpd0911.github.io/swaggerUI-SE104/

## Deploy
- This server is deployed in onrender 
- The link of the server: https://se104-eateria.onrender.com
- The link of website: https://4food.vercel.app/home 