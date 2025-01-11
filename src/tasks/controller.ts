import type { OpenAPIHono } from "@hono/zod-openapi";
import { createPostRouter, getTasksRouter } from "./router";
import { verifyAccessTokenMiddleware } from "../middlewares/verify-access-token.middleware";

export const registerTodoRoutes = (app: OpenAPIHono) => {
    const taskPaths = [getTasksRouter.path, createPostRouter.path]
    for (const taskPath of taskPaths) {
        app.use(taskPath, verifyAccessTokenMiddleware)
    }

    app.openapi(createPostRouter, async (c) => {
        const { title, content } = c.req.valid('json')
        const client = c.get('prisma')
        const data = await client.task.create({ data: { title, content } });
        return c.json({ id: data.id })
    })

    app.openapi(getTasksRouter, async (c) => {
        const client = c.get('prisma')
        const data = await client.task.findMany();
        const mapperData = data.map((d) => ({ ...d, content: d.content ?? undefined }))
        return c.json(mapperData)
    })


}
