import Redis from 'redis';

async function createServer() {

    const redisClient = Redis.createClient({
        url: process.env.REDIS_URL,
    });

    await redisClient.connect();

    if (process.env.DEVELOPMENT) {
        Bun.serve({
            async fetch(request) {
                const url = new URL(request.url);

                return handleRequestDev(url.pathname);
            },
            port: 8888,
        });
    } else {
        Bun.serve({
            async fetch(request) {
                const path = new URL(request.url).pathname;
                if (path !== '/') {
                    const file = Bun.file('./dist/client' + path)

                    if (file.type !== 'application/octet-stream') {
                        return new Response(file)
                    }
                }
                return handleRequest(request, path);
            },
            port: 8888,
        });
    }


    async function handleRequest(req, pathname) {

        const cacheKey = `page:${pathname}`;
        let cachedPage = await redisClient.get(cacheKey);
        cachedPage = null

        if (cachedPage) {
            return new Response(cachedPage, {
                headers: {'Content-Type': 'text/html'},
            });
        }

        const templatePath = './dist/client/index.html';

        const template = await (await Bun.file(templatePath)).text();

        const appHtml = (await import("./dist/server/entry-server.js")).default(pathname)

        const html = template.replace(`<!--ssr-outlet-->`, appHtml);

        await redisClient.set(cacheKey, html, {EX: 10});

        return new Response(html, {
            headers: {'Content-Type': 'text/html'},
        });
    }

    async function handleRequestDev(pathname) {
        const cacheKey = `page:${pathname}`;
        if (!process.env.USECACHE.length) {
            let cachedPage = await redisClient.get(cacheKey);
            return new Response(cachedPage, {
                headers: {'Content-Type': 'text/html'},
            });
        }

        const templatePath = './index.html';

        const template = await (await Bun.file(templatePath)).text();

        const appHtml = (await import("./src/entry-server.js")).default(pathname)

        const html = template.replace(`<!--ssr-outlet-->`, appHtml);

        if (process.env.SAVECACHE.length) {
            await redisClient.set(cacheKey, html, {EX: 3});
        }

        return new Response(html, {
            headers: {'Content-Type': 'text/html'},
        });
    }
}

createServer()