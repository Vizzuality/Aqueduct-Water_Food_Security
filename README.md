# Aqueduct Water and Food Security Analyzer

Aqueduct is WRI's water risk platform: it helps you find out where there is water risk across the world. The Water and Food Security Analizer is one of the five tools that Aqueduct offers to analyze the global water risk.

By using this tool, you will be able to see how different crops and production units are affected by water resources in each country. It also provides different scenarios and predictions untill year 2050.

For the different indicators, this tool is using the IFPRI IMPACT Model: https://www.ifpri.org/program/impact-model

## Requirements:


## Installation


### Using Docker (recommended)

Very useful for **development**, it ensures everybody have the same environment. Also you can test production environment.
You can install Docker from [here](https://www.docker.com).

Building docker container:

```bash
docker-compose build
```

Runing container:

```bash
docker-compose up
```

Maybe, first time you will need run these tasks:

```bash
docker-compose run web rake db:create
docker-compose run web rake db:migrate
```

## Running

## Development

## Test

## CartoDB integration

This project requires a [CartoDB](https://cartodb.com/) account to be configured in the .env files
In your CartoDB account, you should add [these custom functions](extra/cartodb_queries.sql)

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/my-new-feature`
5. Submit a pull request :D
