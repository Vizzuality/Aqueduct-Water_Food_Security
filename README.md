# Aqueduct Water and Food Security Analyzer

![Aqueduct screenshot](./screenshot.png)

Aqueduct is WRI's water risk platform: it helps you find out where there is water risk across the world. The Water and Food Security Analizer is one of the five tools that Aqueduct offers to analyze the global water risk.

By using this tool, you will be able to see how different crops and production units are affected by water resources in each country. It also provides different scenarios and predictions untill year 2050.

For the different indicators, this tool is using the IFPRI IMPACT Model: [https://www.ifpri.org/program/impact-model](https://www.ifpri.org/program/impact-model)


## Installation

Requirements:

* NodeJs 6.0+ [How to install](https://nodejs.org/download/)
* pkg-config (probably this one is already installed, if not: `brew install pkg-config`)
* Cairo (`brew install cairo`)

Install dependencies:

```bash
npm install
```

## Usage

Copy `.env.sample` to `.env` and set variables.

To run the server:

```bash
npm start
```

To compile and build:

```bash
npm run build
```


## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/my-new-feature`
5. Submit a pull request :D
