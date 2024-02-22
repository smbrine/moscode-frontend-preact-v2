import Redis from 'redis';

async function createServer() {

    const redisClient = Redis.createClient({
        url: process.env.REDIS_URL,
    });

    await redisClient.connect();

    function mimeType(path) {
        const extension = path.split('.').pop().toLowerCase();
        const mimeTypes = {
            'html': 'text/html',
            'css': 'text/css',
            'js': 'text/javascript',
            'json': 'application/json',
            'png': 'image/png',
            'jpg': 'image/jpeg',
            'jpeg': 'image/jpeg',
            'gif': 'image/gif',
            'svg': 'image/svg+xml',
            'ico': 'image/x-icon',
            'woff': 'font/woff',
            'woff2': 'font/woff2',
            'ttf': 'font/ttf',
            'otf': 'font/otf',
            'eot': 'application/vnd.ms-fontobject',
            'mp4': 'video/mp4',
            'mp3': 'audio/mpeg',
            'wav': 'audio/wav',
            'pdf': 'application/pdf',
            'xml': 'application/xml',
            'zip': 'application/zip',
            'rar': 'application/x-rar-compressed'
        };

        return mimeTypes[extension] || 'application/octet-stream';
    }


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
                    const globalStart = Bun.nanoseconds();
                    const cacheKey = `file:${path}`;
                    try {
                        let cachedFile = await redisClient.get(cacheKey);
                        if (cachedFile) {
                            const fileBuffer = Buffer.from(cachedFile, 'base64');
                            return new Response(fileBuffer, {
                                headers: { 'Content-Type': mimeType(path) },
                            });
                        }

                        const file = Bun.file('./dist/client' + path);
                        if (file && file.type !== 'application/octet-stream') {
                            const fileBuffer = await file.arrayBuffer();
                            const fileBase64 = Buffer.from(fileBuffer).toString('base64');
                            await redisClient.set(cacheKey, fileBase64, { EX: 15 });
                            return new Response(fileBuffer, {
                                headers: { 'Content-Type': file.type },
                            });
                        }
                    } catch (error) {
                        console.error('Error serving file:', error);
                        return new Response('Internal Server Error', { status: 500 });
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

        if (cachedPage) {
            return new Response(cachedPage, {
                headers: {'Content-Type': 'text/html'},
            });
        }

        const templatePath = './dist/client/index.html';

        const template = await (await Bun.file(templatePath)).text();

        const [appHtml, appCss] = await (await import("./dist/server/entry-server.js")).default(pathname)

        const html = template.replace(`<!--ssr-outlet-->`, appHtml).replace('/*style-outlet*/', appCss);

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