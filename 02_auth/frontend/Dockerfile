# syntax=docker/dockerfile:1.4
FROM node:16.13.2-bullseye AS BUILDER
LABEL dockerfile.baseimage="node:16.13.2-bullseye" dockerfile.description="backend" dockerfile.stage="BUILDER"

WORKDIR /scratch
COPY package.json package-lock.json ./
# https://docs.npmjs.com/cli/v7/commands/npm-ci
RUN npm ci

#COPY tsconfig.json .prettierrc jest.config.js .eslintrc ./
COPY public ./public
COPY src ./src
#RUN npm run lint
#RUN npm run test:coverage
RUN npm run build
#RUN npm audit
RUN npm ci --only=production && npm cache clean --force

# A simple nginx server running as non-root user
FROM nginx:1.23.1 as PRODUCTION
LABEL dockerfile.baseimage="nginx:1.23.1" dockerfile.description="nginx-test" dockerfile.stage="PRODUCTION"

## add permissions for nginx user
RUN chown -R nginx:nginx /var/cache/nginx && \
        chown -R nginx:nginx /var/log/nginx && \
        chown -R nginx:nginx /etc/nginx/conf.d
RUN touch /var/run/nginx.pid && \
        chown -R nginx:nginx /var/run/nginx.pid

ENV NODE_ENV production

## switch to non-root user
USER nginx
ENV PORT=80
WORKDIR /work
# NOTE: Escape the \$ otherwise they are rendered at buildtime
COPY --chmod=755 <<EOF /work/bootstrap.sh
#!/bin/sh
echo "bootstrap.sh"
if [ -z "\$PORT" ];then
    PORT=8080
fi
echo "PORT=\$PORT"
export PORT=$PORT

sed -i.bak "s/listen[ ]*80;/listen \$PORT;/g" /etc/nginx/conf.d/default.conf
rm /etc/nginx/conf.d/default.conf.bak

cat /etc/nginx/conf.d/default.conf 

nginx -g "daemon off;"
EOF

WORKDIR /usr/share/nginx/html
COPY --from=BUILDER /scratch/build ./

CMD ["/bin/sh", "-c", "/work/bootstrap.sh"]