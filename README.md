<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

 <h1 align="center" style="margin-top: 0px;">Nest JS Authentication</h1>

## Getting Started

- To get started with this project, clone the repository:

```
git clone https://github.com/RzayevGara/Nest-JS-Authentication.git
```

- Then, create a .env file and add your environment variables:
```
PORT = 3000
MONGO_URI = your mongodb uri
SECRET_TOKEN = secret token for generate jwt token
REFRESH_TOKEN = refresh token for generate reftesh token
NODEMAILER_USERNAME = your e-mail address to send e-mails to users with nodemailer
NODEMAILER_PASS = create `App Passwords` in your email adress
STRIPE_SECRET_KEY = stripe secret key

DATABASE_PORT= your db port
DATABASE_HOST= your db host
DATABASE_USER= your db username
DATABASE_PASSWORD= your db password
DATABASE_NAME= your db name

APP_PORT= app port
```

- Run Migration File:
```
npm run migration:run 
```

- You can start the application with the following command.
```
npm run start:dev
```

#### AdminJS Dashboard: ```http://{your_url}/api```

## Used in this Project:
```
- Nest JS
- Passport JS
- TypeOrm + MySql
- Nest JS JWT
- bcrypt
```
