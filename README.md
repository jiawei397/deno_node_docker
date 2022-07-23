# use docker test nodejs and deno memory

My team has been using Deno for more than a year. But I found that the memory consumption in docker container is relatively large, which is more than twice that of nodejs with the same function. 

This is frustrating, but strangely, if I use Deno inside the program `Deno.memoryUsage()` is even better than nodejs' process which used `process.memoryUsage()`. The value is smaller, but it is another case in docker stats.

[Here](https://github.com/jiawei397/deno_node_docker) is the test sample of docker I used, I use the origin nodejs http and origin Deno http test, and also test koa and oak.

The console logs:
```systemverilog
deno_1   | heapTotal 3.53MB，heapUsed 3.07MB，rss 3.70MB，external:0.00MB
oakjs_1  | heapTotal 5.42MB，heapUsed 3.95MB，rss 4.74MB，external:0.00MB
oak_1    | heapTotal 6.78MB，heapUsed 5.23MB，rss 6.27MB，external:0.00MB
koa_1    | heapTotal 6.93MB，heapUsed 5.50MB，rss 24.12MB，external:0.78MB
node_1   | heapTotal 4.92MB，heapUsed 4.22MB，rss 18.33MB，external:0.52MB
```
But docker stats：
```systemverilog
        CONTAINER           CPU %               MEM USAGE / LIMIT       MEM %               NET I/O             BLOCK I/O           PIDS
deno	c55528ee5171        0.00%               9.355 MiB / 3.858 GiB   0.24%               2.27 kB / 656 B     0 B / 0 B           5
oakjs   a1074c23261b        0.00%               18.3 MiB / 3.858 GiB    0.46%               1.88 kB / 656 B     0 B / 0 B           5
oak 	efafc26ffd90        0.00%               24.75 MiB / 3.858 GiB   0.63%               1.88 kB / 656 B     0 B / 0 B           5
koa   	78b030ee5801        0.00%               9.227 MiB / 3.858 GiB   0.23%               1.97 kB / 656 B     0 B / 0 B           7
node	ae1d64819c6f        0.00%               6.715 MiB / 3.858 GiB   0.17%               3.1 kB / 656 B      0 B / 0 B           7
```
The oak bundled js seems to be better than oak which started on typescript.

The following are my two actual Deno projects, which is also the reason why I did this test.
The console logs:
```systemverilog
project1: heapTotal 50.32MB，heapUsed 47.62MB，rss 49.13MB，external:22.68MB
project2: heapTotal 9.14MB， heapUsed 8.04MB， rss 8.63MB， external:1.16MB
```
docker stats:
```systemverilog
          CONTAINER           CPU %               MEM USAGE / LIMIT       MEM %               NET I/O             BLOCK I/O           PIDS
project1  43144c7cdcb4        0.03%               272.2 MiB / 3.858 GiB   6.89%               51.1 kB / 21.9 kB   0 B / 0 B           5
project2  64700e6c8c7b        0.03%               97.79 MiB / 3.858 GiB   2.48%               516 B / 516 B       0 B / 0 B           6
```

The above tests were conducted in the docker environment of Linux,  nodejs image is **node:16-alpine**  and deno image is **denoland/deno:alpine-1.23.2**：
```systemverilog
Server Version: 1.13.1
Operating System: CentOS Linux 7 (Core)
OSType: linux
Architecture: x86_64
Number of Docker Hooks: 3
CPUs: 4
```
