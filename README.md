# Express + Clean Architecture (Practical Implementation)

This project is a practical JavaScript implementation of **Clean Architecture** in Node.js using **Express**, **Awilix** (dependency injection), and **Sequelize** with PostgreSQL.

It demonstrates how to separate concerns into layers so business rules stay independent from frameworks, database details, and delivery mechanisms.

## What this project includes

- A layered architecture with clear responsibilities:
  - `domain`: entities and business behavior contracts
  - `application`: use cases (interactors)
  - `infrastructure`: persistence implementation (Sequelize repositories)
  - `api`: HTTP controllers/routes and server setup
- Dependency injection via Awilix (`container.js`)
- Generic CRUD composition through base classes and behavior interfaces
- Sequelize model + migration for `User`
- Basic integration-style CRUD tests for `UserInteractor`

## Project structure

```text
api/
  controllers/
  routes/
  server/
  util/
application/
config/
domain/
infrastructure/
  db/
  repositories/
test/
util/
app.js
container.js
```

## Layer-by-layer overview

### 1) Domain layer (`domain/`)

Purpose: business core, independent from frameworks.

- `models/user.model.js`
  - Defines the `User` entity.
  - Enforces required attributes using `REQUIRED(...)` (`firstname`, `lastname`, `nick`).
- `behavior/base.behavior.js`
  - Declares behavior contract methods (`getAll`, `get`, `create`, `update`, `delete`).
- `behavior/user.behavior.js`
  - User-specific behavior contract (extends base behavior).
- `helper.js`
  - Shared domain utilities (`REQUIRED`, `NON_IMPLEMENTED`).

### 2) Application layer (`application/`)

Purpose: orchestrates use cases using domain models and repository abstractions.

- `base.interactor.js`
  - Reusable CRUD use case implementation.
  - Wraps data in domain models before/after repository calls.
- `user.interactor.js`
  - Composes `UserBehavior` + `BaseInteractor` and injects `UserRepository`.

### 3) Infrastructure layer (`infrastructure/`)

Purpose: external technical details (database and concrete repositories).

- `repositories/base.repository.js`
  - Generic Sequelize-based CRUD implementation.
- `repositories/user.repository.js`
  - User repository bound to Sequelize `User` model.
- `db/models/*.js`
  - Sequelize model definitions.
- `db/migrations/*.js`
  - Database migration scripts.

### 4) API layer (`api/`)

Purpose: delivery mechanism (HTTP).

- `controllers/user.controller.js`
  - Converts HTTP requests into interactor calls.
- `routes/*.routes.js`
  - Route factories that bind controllers.
- `util/default-router.js`
  - Auto-registers CRUD endpoints if controller methods exist.
- `server/index.js`
  - Express app setup, `/api` prefix, middleware, and global error handling.

## Dependency Injection and module discovery

- `container.js` builds the Awilix container.
- Modules are loaded automatically from each folder via `util/import-modules.js`.
- Classes are registered as singletons with `asClass(...).singleton()`.
- Functions are registered with `asFunction(...).singleton()`.

Application entry point:

```js
// app.js
const container = require("./container")
container.cradle.startServer()
```

## Request flow (end-to-end)

1. HTTP request reaches route in `api/routes/user.routes.js`.
2. Route delegates to `UserController` method.
3. Controller calls `UserInteractor` use case.
4. Interactor maps payload to `User` domain model.
5. Interactor calls `UserRepository`.
6. Repository executes Sequelize operation on PostgreSQL.
7. Result is mapped back to domain model and returned as JSON.

## API endpoints

All endpoints are under `/api`.

### Users

- `GET /api/users` -> list users
- `GET /api/users/:id` -> get user by id
- `POST /api/users` -> create user
- `PUT /api/users/:id` -> update user
- `DELETE /api/users/:id` -> delete user

Example create payload:

```json
{
  "firstname": "John",
  "lastname": "Snow",
  "nick": "snow",
  "pass": "123"
}
```

### Customers (example placeholder)

- `GET /api/customers`

## Environment variables (System)

Database config is defined in `config/database.js` and reads values from `process.env`.

Variables **must be configured in the system environment** for real deployments
(server, container, CI/CD, cloud runtime).

### Required variables and what they are used for

- `PORT`: HTTP port for Express (`3000` by default).
- `NODE_ENV`: runtime mode used by Node/your tooling (`development`, `test`, `production`).
- `DEV_DB_USERNAME`: PostgreSQL username for the `development` Sequelize environment.
- `DEV_DB_PASSWORD`: PostgreSQL password for `development`.
- `DEV_DB_NAME`: PostgreSQL database name for `development`.
- `CI_DB_USERNAME`: PostgreSQL username for the `test` Sequelize environment.
- `CI_DB_PASSWORD`: PostgreSQL password for `test`.
- `CI_DB_NAME`: PostgreSQL database name for `test`.
- `PROD_DB_USERNAME`: PostgreSQL username for `production`.
- `PROD_DB_PASSWORD`: PostgreSQL password for `production`.
- `PROD_DB_NAME`: PostgreSQL database name for `production`.
- `PROD_DB_HOSTNAME`: PostgreSQL host for `production`.
- `PROD_DB_PORT`: PostgreSQL port for `production` (usually `5432`).

### How `sequelize-cli --env` maps to variables

- `--env development` -> uses `DEV_DB_*`
- `--env test` -> uses `CI_DB_*`
- `--env production` -> uses `PROD_DB_*`

### Recommendation by environment

- Local development: configure variables in your OS shell/session.
- CI/CD and production: configure variables in the runtime/platform secret manager.

## Install and run

Recommended runtime: Node.js `18` or higher.

Install dependencies:

```bash
npm install
```

Install `nodemon` (required for `npm run dev`):

```bash
npm install --save-dev nodemon
```

Run in development mode:

```bash
npm run dev
```

Default port: `3000` (or `PORT` env var).

## Database migration

The project includes `.sequelizerc` pointing to the custom folders.

Run migrations:

```bash
npx sequelize-cli db:migrate --env development
```

Use `development`, `test`, or `production` depending on which variable group you want to use.

Undo last migration:

```bash
npx sequelize-cli db:migrate:undo --env development
```

## Tests

Run tests:

```bash
npm test
```

`test/user.test.js` validates CRUD behavior through `UserInteractor`.

## Notes and practical considerations

- This implementation favors clarity and composability for learning Clean Architecture.
- `UserBehavior` currently acts as a contract extension point; custom business rules can be added there.
- Base classes (`BaseInteractor`, `BaseRepository`) reduce duplication for new entities.
- `default-router` enables rapid CRUD exposure while keeping controllers explicit.

## How to extend with a new entity

1. Add domain model in `domain/models`.
2. Add behavior contract in `domain/behavior`.
3. Add Sequelize model + migration in `infrastructure/db`.
4. Add repository extending `BaseRepository`.
5. Add interactor extending `BaseInteractor`.
6. Add controller + route in `api/controllers` and `api/routes`.
7. Restart app (modules are auto-discovered and registered).

## How to cite this repository

### IEEE

[1] N. L. Ayala-Frasnelli and A. D. Ruiz-Diaz-Medina, "Express + Clean Architecture (Practical Implementation). GitHub repository." GitHub, 2021. [Online]. Available: https://github.com/NazarioLuis/api-express-clean-arch

### BibTeX

```bibtex
@misc{nazarioluis_express_clean_architecture_2021,
  title     = {Express + Clean Architecture (Practical Implementation). {GitHub} repository.},
  url       = {https://github.com/NazarioLuis/api-express-clean-arch},
  publisher = {GitHub},
  author    = {Ayala-Frasnelli, Nazario Luis and Ruiz-Diaz-Medina, Antonio Davida},
  year      = {2021}
}
```
