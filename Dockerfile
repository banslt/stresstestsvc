FROM alpine:3.7

ENV BUILD_PACKAGES \
  bash \
  curl \
  openssh-client \
  sshpass \
  git \
  python \
  ca-certificates


RUN set -x && \
    echo "==> Adding build-dependencies..."  && \
    apk --update add --virtual build-dependencies && \
    echo "==> Upgrading apk and system..."  && apk update && apk upgrade

RUN apk add --no-cache --virtual run-dependencies --update \
    libc6-compat
    
RUN echo "### NODEJS INSTALL ###" && \
    apk --update add nodejs nodejs-npm 
RUN npm install forever -g 

RUN echo "### APIs INSTALL ###"
ENV LD_LIBRARY_PATH /stresstest/node_modules/appmetrics

WORKDIR /stresstest/
COPY stresstestapp/package.json package.json
RUN npm install --silent
COPY stresstestapp/ .   

# using expose-gc to force the trigger of garbage collector at the end of a memory stress to free memory instantly 
CMD cd /stresstest/ && forever start -c "node --expose-gc --max-old-space-size=8192" mainapp.js ; while :; do sleep 2073600; done
