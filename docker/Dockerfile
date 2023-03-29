ARG NODE_VERSION

FROM node:$NODE_VERSION-stretch

ARG NODE_VERSION

RUN mkdir /app

WORKDIR /app

# Add Yarn to the sources list
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
  && echo 'deb http://dl.yarnpkg.com/debian/ stable main' > /etc/apt/sources.list.d/yarn.list \
  && apt-get update \
  && apt-get install -y yarn bash git \
    libcairo2-dev libjpeg-dev libpango1.0-dev libgif-dev build-essential g++ \
  && yarn global add yalc

COPY docker/entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
