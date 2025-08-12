
FROM node:20.11.1-bullseye AS builder
LABEL dockerfile.baseimage="node:20.11.1-bullseye" dockerfile.description="backend" dockerfile.stage="BUILDER"

ARG COMMIT_ID=${COMMIT_ID:-UNKNOWN}
ARG BUILD_TIME=${BUILD_TIME:-UNKNOWN}
ENV COMMIT_ID=${COMMIT_ID}
ENV BUILD_TIME=${BUILD_TIME}

WORKDIR /scratch

#RUN curl -sf -o /bin/node-prune https://gobinaries.com/tj/node-prune && chmod +x /bin/node-prune && /bin/node-prune

COPY package.json package-lock.json ./
# https://docs.npmjs.com/cli/v7/commands/npm-ci
RUN npm ci

COPY tsconfig.json .prettierrc jest.config.cjs .eslintrc ./
COPY src ./src
COPY public ./public

RUN npm run lint
#RUN npm run test:coverage
RUN npm run build
RUN npm run audit:production
RUN npm ci --only=production && npm cache clean --force

# prune the node_modules
#RUN /usr/local/bin/node-prune --verbose ./node_modules

FROM gcr.io/distroless/nodejs20-debian11:debug AS production
LABEL dockerfile.baseimage="gcr.io/distroless/nodejs:20" dockerfile.description="backend" dockerfile.stage="PRODUCTION"

ENV NODE_ENV=production
ARG COMMIT_ID=${COMMIT_ID:-UNKNOWN}
ARG BUILD_TIME=${BUILD_TIME:-UNKNOWN}
ENV COMMIT_ID=${COMMIT_ID}
ENV BUILD_TIME=${BUILD_TIME}

WORKDIR /work
COPY --from=builder /scratch/package.json /scratch/package-lock.json ./
COPY --from=builder /scratch/node_modules ./node_modules
COPY --from=builder /scratch/build ./
COPY --from=builder /scratch/public ./public

CMD ["/work/src/index.js"]
#ENTRYPOINT [ "/nodejs/bin/node" ]
#CMD ["--no-warnings", "--experimental-specifier-resolution=node", "/work/src/index.js"]
