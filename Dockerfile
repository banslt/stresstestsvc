FROM node:8-alpine as build


RUN apk add --no-cache --virtual build-dependencies --update \
    curl \
    python \
    build-base \
    libexecinfo-dev

ENV NODE_ENV production
ENV DOCKER_BUILD=true

WORKDIR /stresstest/
COPY stresstestapp/package.json package.json
RUN npm install
COPY stresstestapp/ .   

RUN apk del build-dependencies

FROM node:8-alpine

RUN apk add --no-cache --virtual run-dependencies --update \
    libc6-compat

RUN apk add --no-cache --virtual build-dependencies --update \
    python \
    g++ \
    make 
    
COPY --from=build /stresstest /stresstest
WORKDIR /stresstest

ENV LD_LIBRARY_PATH /app/node_modules/appmetrics

RUN npm i appmetrics --silent
RUN npm i -g forever
RUN apk del build-dependencies
# using expose-gc to force the trigger of garbage collector at the end of a memory stress to free memory instantly 
CMD cd /stresstest/ && forever start -c "node --expose-gc --max-old-space-size=8192" mainapp.js ; while :; do sleep 2073600; done
