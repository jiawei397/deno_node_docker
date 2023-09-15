import { Application } from "https://deno.land/x/oak@v12.6.1/mod.ts";
const app = new Application();

app.use((ctx) => {
  ctx.response.body = "Hello World!";
});

const format = function (bytes: number) {
  return (bytes / 1024 / 1024).toFixed(2) + "MB";
};
setInterval(() => {
  const mem = Deno.memoryUsage();
  console.info(
    `heapTotal ${format(mem.heapTotal)}，heapUsed ${format(mem.heapUsed)}，rss ${
      format(mem.rss)
    }，external:${format(mem.external)}`,
  );
}, 10_000);

await app.listen({ port: 8000 });
