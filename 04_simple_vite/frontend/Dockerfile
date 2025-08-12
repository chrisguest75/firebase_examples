FROM node:22.11.0-bookworm AS builder

LABEL dockerfile.baseimage="node:22.11.0-bookworm" dockerfile.description="frontend" dockerfile.stage="builder"

ARG COMMIT_ID=${COMMIT_ID:-UNKNOWN}
ARG BUILD_TIME=${BUILD_TIME:-UNKNOWN}
ARG API_BASE_URL=${API_BASE_URL:-""}
ENV VITE_COMMIT_ID=${COMMIT_ID}
ENV VITE_BUILD_TIME=${BUILD_TIME}
ENV VITE_API_BASE_URL=${API_BASE_URL}

WORKDIR /scratch

#RUN curl -sf -o /bin/node-prune https://gobinaries.com/tj/node-prune && chmod +x /bin/node-prune && /bin/node-prune

COPY package.json package-lock.json ./
# https://docs.npmjs.com/cli/v7/commands/npm-ci
RUN npm ci

COPY vite.config.ts tsconfig.json tsconfig.node.json tsconfig.app.json index.html ./
COPY public ./public
COPY src ./src

#RUN npm run lint
#RUN npm run test:coverage
RUN npm run build
#RUN npm run audit:production
RUN npm ci --only=production && npm cache clean --force

# prune the node_modules
#RUN /usr/local/bin/node-prune --verbose ./node_modules

FROM nginx:1.29.0 AS production
LABEL dockerfile.baseimage="nginx:1.29.0" dockerfile.description="frontend" dockerfile.stage="production"

ARG COMMIT_ID=${COMMIT_ID:-UNKNOWN}
ARG BUILD_TIME=${BUILD_TIME:-UNKNOWN}
ARG API_BASE_URL=${API_BASE_URL:-""}
ENV VITE_COMMIT_ID=${COMMIT_ID}
ENV VITE_BUILD_TIME=${BUILD_TIME}
ENV VITE_API_BASE_URL=${API_BASE_URL}
WORKDIR /work
COPY bootstrap.sh /work/bootstrap.sh

WORKDIR /usr/share/nginx/html
COPY --from=builder /scratch/dist ./
COPY --from=builder /scratch/public ./public

CMD ["/bin/sh", "-c", "/work/bootstrap.sh"]