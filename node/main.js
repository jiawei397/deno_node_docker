const http = require('http');


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

// Server has a 5 seconds keep-alive timeout by default
http
    .createServer((req, res) => {
        res.write('hello node');
        res.end();
    })
    .listen(8000);
