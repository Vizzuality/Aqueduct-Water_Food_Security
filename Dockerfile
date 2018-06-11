FROM node:8.11.2

ENV NODE_ENV production
ENV API_URL https://api.resourcewatch.org/v1
ENV BASEMAP_TILE_URL https://api.tiles.mapbox.com/v4/wri.c974eefc/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoid3JpIiwiYSI6IjU3NWNiNGI4Njc4ODk4MmIyODFkYmJmM2NhNDgxMWJjIn0.v1tciCeBElMdpnrikGDrPg
ENV BASEMAP_LABEL_URL https://api.tiles.mapbox.com/v4/wri.acf5a04e/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoid3JpIiwiYSI6IjU3NWNiNGI4Njc4ODk4MmIyODFkYmJmM2NhNDgxMWJjIn0.v1tciCeBElMdpnrikGDrPg
ENV USERNAME aqueduct
ENV PASSWORD password

# Install dependencies
RUN apt-get update && \
    apt-get install -y bash git \
    libcairo2-dev libjpeg-dev libpango1.0-dev libgif-dev build-essential g++ \
    && mkdir -p /usr/src/app

# Add app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
COPY yarn.lock /usr/src/app/
RUN yarn install

# Bundle app source
COPY . /usr/src/app
RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]
