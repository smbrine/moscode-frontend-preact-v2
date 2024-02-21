import path from "path"
import express from 'express'
import fs from "fs";
import {createClient} from "redis";

const createServer = async () => {
    const app = express()
    const client = createClient(
        {
            url: "redis://localhost:6379/1" || process.env.REDIS_URL,
        }
    )
    await client.connect()


    app.use((await import("compression")).default())
    app.use(
        (await import('serve-static')).default(path.resolve("dist/client"), {
            index: false
        }),
    )


    app.use('*', async (req, res, next) => {
        const url = req.originalUrl
        try {
            const cacheKey = `page:${url}`;
            const cachedPage = await client.get(cacheKey);
            // const cachedPage = null;

            if (cachedPage) {
                res.status(200).set({"Content-Type": "text/html"}).end(cachedPage);
            } else {
                let template, render;
                template = fs.readFileSync(path.resolve('./dist/client/index.html'), "utf-8")
                render = (await import("./dist/server/entry-server.js")).default
                const appHtml = await render(url)
                const html = template.replace(`<!--ssr-outlet-->`, appHtml)

                await client.set(cacheKey, html, {EX: 10});

                res.status(200).set({"Content-Type": "text/html"}).end(html);
            }

        } catch (e) {
            if (process.env.NODE_ENV === "development") {
                console.log(e)
            }
            next(e)
        }
    })

    app.listen(8882)
}


createServer()