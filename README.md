# Teste Desenvolvedor Java Fullstack Philips

## Technologies

- Spring Boot
- React
- Docker
- Postgres
- Gradle

### Get Start

Configure DB, back-end(Spring Boot) and front-end(React Web)

## DataBase

Create environment by docker image running command line bellow:

`docker run --name meta -e POSTGRES_PASSWORD=127514 -p 5432:5432 postgres`

After create environment db have to connect it
Password: 127514

![alt text][DB CONNECT]

[DB CONNECT]: https://github.com/PauloAraujoNobre/Teste-Meta-Philips/blob/master/frontend/meta/images/dbconnect.png "DataBase Connection"

Now you should create database named `"meta"`

![alt text][DB TODO]

[DB TODO]: https://github.com/PauloAraujoNobre/Teste-Meta-Philips/blob/master/frontend/meta/images/createtodo.png "DataBase TODO"

## Back-end

After download, import project with `"Existing Gradle Project"`

Next to, start application to run changelogs

## Front-end

Just download project and run:\
`npm install`

## Casual Problems

- Can't resolve 'react-router-dom' in front-end
  
  - Solution: Run this command line:  `npm install react-router-dom --save`

- 