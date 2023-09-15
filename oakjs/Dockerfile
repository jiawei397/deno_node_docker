FROM docker.io/denoland/deno:alpine-1.36.2

EXPOSE 8000

WORKDIR /app

# Prefer not to run as root.
RUN chown -R deno /app
RUN chmod 755 /app

ADD . .

CMD deno run --allow-net mod.js