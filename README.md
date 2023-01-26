# LiLzProject

## Description

This is a project created by Kieu Quoc Chien. The goal of this project is to do the programming task from Lilz Company.

## Getting Started

## Installation

### Install npm packages

- Install [nodejs](http://nodejs.org/download/) and [mysql](http://dev.mysql.com/downloads/mysql/)

```bash
$ npm install
```

## Setting up

### IDE/Editor

- IntelliJ WebStorm
- Any editor: Visual Studio Code, Sublime, Atom,...

### Environment variable

1. Create `dev.env` and `prod.env` and `stag.env` based on `sample.env`.
2. Modify `dev.env` and `prod.env` and `stag.env` files for each environment.

### Database

- This template use <a href="https://typeorm.io/#/">TypeORM</a> as Object–relational mapping library.
- TypeORM supports many database programs.
- Detail configuration can be done in `src/configs/db.config.ts`.
- By default, the project is configured to use MySQL relational database management system.

### Intantiate a module

See <a href='https://docs.nestjs.com/recipes/crud-generator'>NestJS CRUD generator.</a>

- Default:

```bash
$ nest g resource modules/<module-name>
```

Select `REST API`. NestJS CLI will generate a boilerplate for the module.

- If the structure is more complex:

```bash
$ nest g resource <module-name>
```

Copy the generated module to `src/modules/<your desired folder>`.

### Logging

- See <a href='https://docs.nestjs.com/techniques/logger'>NestJS Logger</a>.
- By default:

1. `development` will log `['log', 'debug', 'error', 'verbose', 'warn']` levels.
2. `production` will log `['error', 'warn']` levels.

- Logging levels can be customized in `main.ts` for each environment.

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Start with Docker

- Install [Docker](https://docs.docker.com/get-docker/)

```bash
$ docker compose up
```

## How to Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

## Deploy to Heroku

- Create an app in Heroku named 'lilz-app'

- Add a heroku remote to the local repository

```bash
$ heroku git:remote -a lilz-app
```

- Deploy Code

```
git push heroku main
```

## Folder structure

```js
+-- config // Environment config files.
+-- src // Sources files
|   +-- config // Environment config files.
|   +-- helpers // Common files.
|   |   +-- dto // Common DTO.
|   |   +-- entities // Common Entities.
|   |   +-- filter // Common Filter.
|   |   +-- interceptors // Common interceptors.
|   |   +-- logger // App Logger.
|   |   +-- middilewares // App middlewares.
|   |   +-- pagination // P.
|   +-- modules // Bussiness Modules.
|   |   +-- gauges // Gauge module.
|   |   |   +-- dto // DTO (Data Transfer Object) Schema, Validation.
|   |   |   +-- entities // Gauge Entities.
|   |   |   +-- gauge.controller.ts // Gauge controller.
|   |   |   +-- gauge.module.ts // Gauge module file.
|   |   |   +-- gauge.service.ts // Gauge service.
|   |   +-- measurements // Measurement module.
|   |   |   +-- dto // DTO (Data Transfer Object) Schema, Validation.
|   |   |   +-- entities // Measurement Entities.
|   |   |   +-- measurement.controller.ts // Measurement controller.
|   |   |   +-- measurement.module.ts // Measurement module file.
|   |   |   +-- measurement.service.ts // Measurement service.
|   +-- app.module.ts // App module file.
|   +-- main.ts // Main.
+-- test // Jest testing.
```

## Documentation

### Swagger

- Visit http://localhost:5000/api-swagger
- This project ultilize <a href='https://docs.nestjs.com/openapi/cli-plugin'> NestJS's CLI Plugin </a>.
- Please aware that there is no need to put `@ApiProperty` decorator for every DTOs properties. For more information, please visit the link above.

## License

Nest is [MIT licensed](LICENSE).
