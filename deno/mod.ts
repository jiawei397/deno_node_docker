import { serve } from "https://deno.land/std@0.119.0/http/server.ts";

function handler(_req: Request): Response {
    return new Response("Hello, World!");
}

const format = function (bytes: number) {
    return (bytes / 1024 / 1024).toFixed(2) + "MB";
};
setInterval(() => {
    const mem = Deno.memoryUsage();
    console.info(
        `heapTotal ${format(mem.heapTotal)}，heapUsed ${format(mem.heapUsed)
        }，rss ${format(mem.rss)}，external:${format(mem.external)}`,
    );
}, 10_000)

console.log("Listening on http://localhost:8000");
serve(handler);
