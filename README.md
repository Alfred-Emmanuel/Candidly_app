# Candidly
An anonymous messaging platform built with NextJs, NodeJs, ExpressJS, MongoDB and AWS S3 for storing images with the server hosted on Render while the client is hosted on Vercel

<!-- ## Project Videos
1. React Client App: https://youtu.be/LGdIDm-4Dv8
2. Flask Server and Heroku Deployment: https://youtu.be/OX4IBcoKVfg -->

The project is composed of two folders, candidly_backend (server) and candidly_frontend (client)

## candidly_frontend
This is a multiple page Next.Js 13.5 app written with tailwind CSS that allows individuals to receive anonymous messages from wherever they share their links like whatsapp status, twitter e.t.c, it stores the multimedia files such as images in AWS S3 and stores the data in a MongoDB database including reference to the images stored in the S3 bucket.

### Dependencies
1. Create a .env file directly inside the `candidly_frontend/my-app` folder
2. You need to understand how [NEXT AUTH](https://next-auth.js.org/){:target="_blank" rel="noopener"} works. 
2. The needed variables inside the .env file are as follows: 
    - `PRODUCTION_ENDPOINT` (This is the endpoint to your backend either hosted on a platform like render, heroku or locally (for development))
    - `NEXTAUTH_URL` (This is the url to your client (frontend) either hosted on a platform like vercel, netlify or locally (for development))
    - `NEXTAUTH_SECRET` (This can be any string of your choosing)

### Running client Locally
1. Be in `candidly_frontend/my-app` folder
2. `npm install` To install dependencies
3. `npm run dev` To start your development server

## candidly_backend
This is a nodejs express web server that listens for calls which could originate from various parts of the application such as creating a new user, updating an existing user details, sending a new message, logging in e.t.c

### Dependencies
1. You need to have an account on [AWS](https://aws.amazon.com/pm/serv-s3/){:target="_blank" rel="noopener"} S3.
2. You need to understand how [JWT](https://jwt.io/introduction){:target="_blank" rel="noopener"} works.
3. You need to have mongodb set up on your machine and understand how it works.
3. Create a .env file directly inside `candidly_backend` folder
4. The needed variables inside the .env file are as follows: 
    - `AWS_ACCESS_KEY_ID`
    - `AWS_BUCKET_NAME`
    - `AWS_REGION`
    - `AWS_SECRET_ACCESS_KEY`
    - `JWT_SECRET`
    - `MONGODB_URI`
    - `PRODUCTION_URL` (url to your frontend)
    - `EMAIL` (any email address)
    - `MAIL_PASSWORD` (some email providers like gmail require you to generate an "app specific password")

### Running Server Locally
1. Make sure you are in the root folder `Candidly_app/`
2. Run `npm start`


Happy coding!