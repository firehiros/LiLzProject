FROM node:14.16.1-alpine3.13 As builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:14.16.1-alpine3.13 As production

WORKDIR /usr/src/app

RUN npm install -g pm2

COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/ecosystem.json ./ecosystem.json
COPY --from=builder /usr/src/app/package.json ./package.json

RUN npm install

EXPOSE 5000

ENTRYPOINT [ "pm2-runtime", "start", "ecosystem.json" ]
