# Build image
FROM node:12.18-alpine AS build
ARG BASE_PATH
ARG DATABASE_TYPE=mysql
ENV BASE_PATH=$BASE_PATH
ENV DATABASE_URL "mysql://username:mypassword@localhost:3306/mydb" \
    DATABASE_TYPE=$DATABASE_TYPE
WORKDIR /build

RUN yarn config set --home enableTelemetry 0
COPY package.json yarn.lock /build/

# Install only the production dependencies
RUN yarn install --production --frozen-lockfile

# Cache these modules for production
RUN cp -R node_modules/ prod_node_modules/

# Install development dependencies
RUN yarn install --frozen-lockfile

COPY . /build
RUN yarn next telemetry disable
RUN yarn build

# Production image
FROM node:12.18-alpine AS production
WORKDIR /app

# Copy cached dependencies
COPY --from=build /build/prod_node_modules ./node_modules

# Copy generated Prisma client
COPY --from=build /build/node_modules/.prisma/ ./node_modules/.prisma/

COPY --from=build /build/yarn.lock /build/package.json ./
COPY --from=build /build/.next ./.next
COPY --from=build /build/public ./public

RUN  apk update \
    && apk add tzdata \
    && cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && echo "Asia/Shanghai" > /etc/timezone

USER node

EXPOSE 3000
CMD ["yarn", "start"]
