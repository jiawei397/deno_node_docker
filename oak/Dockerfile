FROM docker.io/denoland/deno:alpine-1.36.2

EXPOSE 8000

WORKDIR /app

# Prefer not to run as root.
RUN chown -R deno /app
RUN chmod 755 /app

ADD . .

RUN deno cache mod.ts

CMD deno run --allow-net mod.ts