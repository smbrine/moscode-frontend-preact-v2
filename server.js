async function createServer() {

    const webpages = ['/', '/policy', '/index.html']

    Bun.serve({
        async fetch(request) {
            return handleRequest(request)
        },
        port: process.env.SERVER_PORT || 8888,
        hostname: process.env.SERVER_HOST || '0.0.0.0'
    })

    async function handleRequest(req) {

        const path = new URL(req.url).pathname;

        if (path === "/update") {
            return await handleUpdateRequest(req, path)
        } else if (path === '/healthz') {
            return new Response(JSON.stringify(
                    {
                        health: "ok"
                    }
                )
            )
        } else if (webpages.includes(path)) {
            return await handleFrontendRequest(req, path)
        } else {
            return await handleFSRequest(req, path)
        }
    }

    async function handleFrontendRequest(req, pathname) {
        if (pathname === '/index.html') {
            pathname = '/'
        }
        const templatePath = './dist/client/index.html';

        const template = await (await Bun.file(templatePath)).text();

        const [appHtml, appCss] = await (await import("./dist/server/entry-server.js")).default(pathname)

        const html = template.replace(`<!--ssr-outlet-->`, appHtml).replace(`/*style-outlet*/`, appCss);

        return new Response(html, {
            headers: {'Content-Type': 'text/html'},
        });
    }

    async function handleFSRequest(req, pathname) {
        try {
            const file = Bun.file('./dist/client' + pathname);
            if (file && file.type !== 'application/octet-stream') {
                const fileBuffer = await file.arrayBuffer();
                return new Response(fileBuffer, {
                    headers: {'Content-Type': file.type},
                });
            }
        } catch (error) {
            console.error('Error serving file:', error);
            return new Response('Internal Server Error', {status: 500});
        }
    }

    async function getFilenames() {
        const globFiles = new Bun.Glob('**/*.*')

        const distDir = "./dist/client"

        const filesList = []
        for (const file of globFiles.scanSync(distDir)) {
            filesList.push(file)
        }
        return filesList
    }

    async function handleUpdateRequest(req, pathname) {
        const filesList = await getFilenames();
        const response = {
            files: filesList,
            pages: webpages,
        }
        return new Response(JSON.stringify(response))
    }

}

createServer()
