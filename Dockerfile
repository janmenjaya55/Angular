#stage 1
FROM node:16.14.2 as node
WORKDIR /app
COPY . .
RUN npm install
#RUN npm run build --prod
RUN npm run node --max_old_space_size=6192 node_modules/@angular/cli/bin/ng build --prod --base-href

#stage 2
FROM nginx:alpine
COPY --from=node /app/dist/angular-world /usr/share/nginx/html
