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

### Development

To run the application, use the command: `npm run start:dev`

To run the application tests, use the command: `npm run test`

It is important to set up environment variables for the system to function properly

## Usage

- Register on “iqair” and create your [API KEY HERE](https://www.iqair.com/fr/dashboard/api )
- NOTE: the activation of the key can take a few minutes (about 5 minutes).
- On your `.env` replace   `<YOUR API KEY>` with your generated API Key.
`AIR_VISUAL_API_KEY=<YOUR API KEY>`

Start your node js server and call this endpoint 

- GET AIR QUALITY ENDPOINT
`/v1/location/nearest-city?longitude=2.352222&latitude=48.856613` [GET]

Expected Success Response (200)

```bash
{
    "status": true,
    "message": "Air quality retrieved successfully",
    "data": {
        "Result": {
            "Pollution": {
                "ts": "2022-09-09T06:00:00.000Z",
                "aqius": 51,
                "mainus": "p2",
                "aqicn": 17,
                "maincn": "p2"
            }
        }
    }
}
```

Network Error (503)
```bash
{
    "status": false,
    "error": "bad_request",
    "message": "Location request failed.",
    "data": {
        "gateway_response": "getaddrinfo ENOTFOUND api.airvisual.com"
    }
}
```

- MOST POLLUTED TIME (PARIS - DEFAULT) ENDPOINT
`/v1/location/most-polluted-time` [GET]

Expected Success Response (200)

```bash
{
    "status": true,
    "message": "Most polluted time retrieved successfully",
    "data": {
        "time": "2022-09-08T14:49:01.000Z"
    }
}
```
- MOST POLLUTED TIME (ANY COODINATE) ENDPOINT
`/v1/location/most-polluted-time?longitude=2.352222&latitude=48.856613` [GET]

Expected Success Response (200)

```bash
{
    "status": true,
    "message": "Most polluted time retrieved successfully",
    "data": {
        "time": "2022-09-08T14:49:01.000Z"
    }
}
```

OR Check out the postman documentation here
[POSTMAN DOCUMENTATION](https://documenter.getpostman.com/view/10912779/VVBZSkTX)

To run the cron job, use the command: `npm run cron:dev`
This will execute the cron task that calls the IQAIR API to get “air quality “ for the Paris zone ( latitude:
`48.856613` ,longitude: `2.352222`) every 1 minute then save them in the database.

#### Logging

Sometimes, it's necessary to send logs to the stdout or store them, to do this, make use of the exported [logger](src/core/utils/logger)

You can log errors based on their levels:

-   error

-   warn

-   info

-   debug


Example: `logger.error('This is an error!')`

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
<a href="https://twitter.com/mr_udele/">Twitter.</a> <br/>
<a href="https://www.linkedin.com/in/abrahamudele/">Linkedin.</a>

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
