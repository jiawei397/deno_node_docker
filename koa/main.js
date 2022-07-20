const Koa = require('koa');
const app = new Koa();

// response
app.use(ctx => {
    ctx.body = 'Hello Koa';
});

const format = function (bytes) {
    return (bytes / 1024 / 1024).toFixed(2) + "MB";
};
setInterval(() => {
    const mem = process.memoryUsage();
    console.info(
        `heapTotal ${format(mem.heapTotal)}，heapUsed ${format(mem.heapUsed)
        }，rss ${format(mem.rss)}，external:${format(mem.external)}`,
    );
}, 10_000)

app.listen(8000);