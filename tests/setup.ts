import type { OpenAPIHono } from "@hono/zod-openapi";

export const executePostRequest = async <T>(app: OpenAPIHono, path: string, body?: T) => {
    return await app.request(path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: body ? JSON.stringify(body) : undefined })
}