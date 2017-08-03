NODE_ENV=production
cd ./node_modules/aqueduct-components
npm install
npm run build
cd ..
cd ..
./node_modules/.bin/webpack --config ./config/webpack.config.js --progress --colors
