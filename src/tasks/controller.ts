import { createPostRouter, getTasksRouter } from "./router";
import { verifyAccessTokenMiddleware } from "../middlewares/verify-access-token.middleware";
import type app from "..";

export const registerTodoRoutes = (baseApp: typeof app) => {
    const taskPaths = [getTasksRouter.path, createPostRouter.path]
    for (const taskPath of taskPaths) {
        baseApp.use(taskPath, verifyAccessTokenMiddleware)
    }

    baseApp.openapi(createPostRouter, async (c) => {
        const { title, content } = c.req.valid('json')
        const client = c.get('prisma')
        const data = await client.task.create({ data: { title, content } });
        return c.json({ id: data.id })
    })

    baseApp.openapi(getTasksRouter, async (c) => {
        const client = c.get('prisma')
        const kv = c.env.MY_KV_NAMESPACE;
        await kv.put('key', 'value');
        const data = await client.task.findMany();
        const mapperData = data.map((d) => ({ ...d, content: d.content ?? undefined }))
        return c.json(mapperData)
    })
}
