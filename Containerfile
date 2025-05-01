###########################################################################
# Build base image
###########################################################################
FROM node:22-alpine AS base

COPY ./ /var/workdir/

WORKDIR /var/workdir/

ENV PNPM_VERSION=10.10.0
ENV PNPM_HOME=/usr/local/bin
RUN wget -qO- https://get.pnpm.io/install.sh | ENV="$(mktemp)" SHELL="$(which sh)" sh -s --

RUN pnpm install --frozen-lockfile --production

###########################################################################
# Check syntax
###########################################################################
FROM base AS check

RUN node --check $(find ./src -type f \( -name '*.mjs' -or -name '*.js' \))

###########################################################################
# Build runtime image
###########################################################################
FROM node:22-alpine

COPY --from=check /var/workdir/src/ /var/workdir/
COPY --from=check /var/workdir/.env /var/workdir/
COPY --from=check /var/workdir/node_modules /var/workdir/node_modules

WORKDIR /var/workdir/

ENTRYPOINT npx dotenvx run --overload --strict -f .env -fk keys/.env.keys -- node index.mjs
