FROM node:23-alpine

ARG APP_WORKIR=/var/www

WORKDIR $APP_WORKIR

COPY ./package.json ./pnpm-lock.yaml ./pnpm-workspace.yaml ./tsconfig*.json ./eslint.config.mjs ./
COPY packages/server ./packages/server

RUN npm install -g pnpm

RUN --mount=type=cache,id=pnpm,target=$APP_WORKIR/pnpm/store pnpm install --frozen-lockfile

EXPOSE 4000

CMD [ "pnpm", "dev" ]
