FROM mhart/alpine-node:8.9.4
LABEL maintainer="HTC-CS"

ARG PROJECT_FOLDER

WORKDIR $PROJECT_FOLDER

ADD /tmp $PROJECT_FOLDER
ADD /package.json $PROJECT_FOLDER/package.json

RUN npm i --production --quiet --no-progress

EXPOSE 8080

CMD ["npm", "run", "start-prod"]
