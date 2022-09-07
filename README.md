## Air Quality API

This is the Cellulant Card Service

## Setup

This section will guide you through the setup process required to get up and running with the application.

### Requirements

-   Node/NPM (optional yarn)

-   Mysql

-   TypeScript (`npm install -g typescript` || `yarn global add typescript`)

### Get Started

1. Clone the project from the repository

2. Run `npm install` or yarn install from the root directory of the project

3. Run `cp .env.example .env` or create a `.env` file and copy the content of `.env.example` to it.

#### Database Setup

1. Create a new database in mysql

2. Fill the `.env` file created with the mysql database credentials

3. Run `npm run migrate` to create the tables, You can run `npm run migrate:undo` to undo the last migration or `npm run migrate:undo:all` to undo all migrations

4. Run `npm run seed:all` to populate tables with needed data

### Development

To run the application, use the command: `npm run start:dev`

It is important to set up environment variables for the system to function properly

#### Logging

Sometimes, it's necessary to send logs to the stdout or store them, to do this, make use of the exported [logger](src/core/utils/logger)

You can log errors based on their levels:

-   error

-   warn

-   info

-   verbose

-   debug

-   silly

Example: `logger.error('You just committed a crime!')`

Ensure you avoid using `console.log` statements anywhere in the code.

#### Environment

Ensure you have eslint and prettier set up on your development environment. Ensure you follow proper linting rules as well.

### Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information what has changed recently.

## Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md) for details.

### Security

If you discover any security related issues, please email abrahamudele@gmail instead of using the issue tracker.

## Credits

-   [Abraham Udele](https://github.com/bytesfield) <br/>
Find me on
<a href="https://twitter.com/mr_udele/">Twitter.</a>
<a href="https://www.linkedin.com/in/abrahamudele/">Linkedin.</a>

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
