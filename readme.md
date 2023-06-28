# **microservices-health-care**

- [About](#about)
- [Requirements](#requirements)
- [Configuring your local environment](#configuring-your-local-environment)
- [Resources](#resources)

## **About**

This project is a hands-on freestyle exercise to demonstrate the use of microservices applied to a health care system. The goal is to obtain a proof of concept on using gRPC communication between SAGA pattern microservices and a API Gateway, which provides a http interface to the client.

## **Requirements**

To run this project locally, you will need the following tools:

- Node.js - v18
- Make
- Docker
- Docker Compose

## **Configuring your local environment**

We will use `make` to run the commands, Docker to build images and run our services in containers, and Docker Compose to orchestrate them.

Run the following command to setup all the environment and run the services:
```sh
make prepare
```

In addition, you can run the following:

- `make stop` to stop all containers
- `make down` to remove app containers
- `make database` to run the database container
- `make migrate` to run migrations
- `make setup-db` to run the database container and migrations
- `make run-services` to run the services containers
- `make purge-all` to stop and remove all containers, networks, images, and volumes

## **Resources**

POST `localhost:3000/doctors`

body:
```json
{
	"name": "John Doe",
	"specialty": "Psychiatrist",
	"medical_license": "1234567890",
	"license_type": "CRM",
	"company_id": [
		"cpn_1234567890",
	],
	"week_schedule": {
		"mon": [
			{
				"startTime": "10h30",
				"endTime": "16h00"
			}
		],
		"tue": [
			{
				"startTime": "5h30",
				"endTime": "10h30"
			},
			{
				"startTime": "12h00",
				"endTime": "15h00"
			}
		],
    "wed": [
      {
        "startTime": "10h30",
        "endTime": "16h00"
      }
    ],
    "thu": [
      {
        "startTime": "5h30",
        "endTime": "10h30"
      },
      {
        "startTime": "12h00",
        "endTime": "15h00"
      }
    ],
    "sun": [
      {
        "startTime": "10h30",
        "endTime": "16h00"
      }
    ]
	}
}
```

POST `localhost:3000/doctors/:id/appointments`

body:
```json
{
	"startTime": "2023-07-22T15:00:00.000Z",
	"companyId": "cpn_1234567890",
	"userId": "usr_1234567890",
	"userData": "{}",
	"appointmentTime": "30m"
}
```

GET `localhost:3000/doctors/:id/appointments`

`?startDate=2023-07-21T00:00:00.000Z&endDate=2023-07-23T00:00:00.000Z`
