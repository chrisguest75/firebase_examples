
FROM node:22.11.0-bookworm AS builder
LABEL dockerfile.baseimage="node:22.11.0-bookworm" dockerfile.description="backend" dockerfile.stage="BUILDER"

WORKDIR /scratch

#RUN curl -sf -o /bin/node-prune https://gobinaries.com/tj/node-prune && chmod +x /bin/node-prune && /bin/node-prune

COPY package.json package-lock.json ./
# https://docs.npmjs.com/cli/v7/commands/npm-ci
RUN npm ci

COPY tsconfig.json .prettierrc jest.config.cjs .eslintrc ./
COPY src ./src
COPY public ./public

RUN npm run lint

ARG COMMIT_ID=${COMMIT_ID:-UNKNOWN}
ARG BUILD_TIME=${BUILD_TIME:-UNKNOWN}
ARG FRONTEND_URL=${FRONTEND_URL:-UNKNOWN}
ENV COMMIT_ID=${COMMIT_ID}
ENV BUILD_TIME=${BUILD_TIME}
ENV FRONTEND_URL=${FRONTEND_URL}

#RUN npm run test:coverage
RUN npm run build
RUN npm run audit:production
RUN npm ci --only=production && npm cache clean --force

# prune the node_modules
#RUN /usr/local/bin/node-prune --verbose ./node_modules

FROM gcr.io/distroless/nodejs22-debian12:debug AS production
LABEL dockerfile.baseimage="gcr.io/distroless/nodejs:20" dockerfile.description="backend" dockerfile.stage="PRODUCTION"

ENV NODE_ENV=production
ARG COMMIT_ID=${COMMIT_ID:-UNKNOWN}
ARG BUILD_TIME=${BUILD_TIME:-UNKNOWN}
ARG FRONTEND_URL=${FRONTEND_URL:-UNKNOWN}
ENV COMMIT_ID=${COMMIT_ID}
ENV BUILD_TIME=${BUILD_TIME}
ENV FRONTEND_URL=${FRONTEND_URL}

WORKDIR /work
COPY --from=builder /scratch/package.json /scratch/package-lock.json ./
COPY --from=builder /scratch/node_modules ./node_modules
COPY --from=builder /scratch/build ./
COPY --from=builder /scratch/public ./public

CMD ["/work/src/index.js"]
#ENTRYPOINT [ "/nodejs/bin/node" ]
#CMD ["--no-warnings", "--experimental-specifier-resolution=node", "--loader", "ts-node/esm", "/work/src/index.js"]