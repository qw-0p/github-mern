FROM node:23-alpine

ARG APP_WORKIR=/var/www

WORKDIR $APP_WORKIR

COPY ./package.json ./pnpm-lock.yaml ./pnpm-workspace.yaml ./tsconfig*.json ./
COPY packages/client ./packages/client

RUN npm install -g pnpm

RUN --mount=type=cache,id=pnpm,target=$APP_WORKIR/pnpm/store pnpm install --frozen-lockfile

EXPOSE 3000

CMD [ "pnpm", "dev" ]
