###########################################################################
# Build base image
###########################################################################
FROM node:22-alpine AS base

COPY ./ /var/workdir/

WORKDIR /var/workdir/

ENV PNPM_VERSION=10.10.0
ENV PNPM_HOME=/usr/local/bin
RUN wget -qO- https://get.pnpm.io/install.sh | ENV="$(mktemp)" SHELL="$(which sh)" sh -s --

RUN pnpm install --frozen-lockfile

###########################################################################
# Build bundle image
###########################################################################
FROM base AS bundle

RUN echo "export var import_meta_url = require('url').pathToFileURL(__filename);" > import-meta-url.js
RUN echo "
require('esbuild').build({
  entryPoints: ['src/index.mjs'],
  outdir: 'dist',
  bundle: true,
  platform: 'node',
  inject: ['import-meta-url.js'],
  define: {'import.meta.url': 'import_meta_url'},
  plugins: [{
    name: 'skip-html',
    setup(build) {
      build.onLoad({filter: /\bpublic\b/}, () => {
        return {contents: '', loader: 'binary'};
      });
    },
  }],
});"  > esbuild.js

RUN node esbuild.js

###########################################################################
# Build runtime image
###########################################################################
FROM node:22-alpine

COPY --from=base /var/workdir/.env /var/workdir/
COPY --from=base /var/workdir/src/public/ /var/workdir/public/
COPY --from=bundle /var/workdir/dist/ /var/workdir/

WORKDIR /var/workdir/

RUN npm install @dotenvx/dotenvx --save

ENTRYPOINT npx dotenvx run --overload --strict -f .env -fk keys/.env.keys -- node index.js
