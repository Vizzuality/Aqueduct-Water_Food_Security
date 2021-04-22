# Aqueduct Water and Food Security Analyzer

![Aqueduct screenshot](./screenshot.png)

Aqueduct is a set of tools developed by World Resources Institute designed to identify and analyze water risk around the world. The Water and Food Security Analyzer provides data and insights into how crops are affected by water resources. For further information see [https://www.wri.org/aqueduct](https://www.wri.org/aqueduct)

This tool uses the IFPRI IMPACT Model: [https://www.ifpri.org/program/impact-model](https://www.ifpri.org/program/impact-model)


## Getting Started

1. Install Docker.
2. Clone the repo.
3. Copy `.env.sample` to `.env` and set variables.
4. Run `docker-compose up`. Visit localhost:3040.

## Deployment
1. Run `docker-compose run web yarn build` to compile.
2. Copy the build to the wriorg repo aqueduct-gr branch build directory.
3. From the wriorg repo, commit and push changes to the aqueduct-gr branch. Enter your Pantheon password when prompted.


