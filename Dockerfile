FROM --platform=linux/amd64 oven/bun:latest

RUN mkdir -p /usr/local/bin/app

WORKDIR /usr/local/bin/app

COPY . .

RUN bun install

RUN bun run ssr:build

EXPOSE 8888

CMD ["bun", "run", "ssr:run"]