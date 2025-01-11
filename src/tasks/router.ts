import { createRoute, z } from "@hono/zod-openapi";
import { CreateTaskParamSchema, CreateTaskResponseSchema, GetTasksQuerySchema, GetTasksResponseSchema } from "./schema";

export const createPostRouter = createRoute({
    method: 'post',
    path: 'task',
    request: {
        body: { content: { "application/json": { schema: CreateTaskParamSchema } } }
    },
    responses: {
        201: {
            content: {
                "application/json": {
                    schema: CreateTaskResponseSchema
                }
            },
            description: 'タスクの作成完了'
        }
    }
})

export const getTasksRouter = createRoute({
    method: 'get',
    path: 'tasks',
    request: {
        query: GetTasksQuerySchema
    },
    responses: {
        200: {
            content: {
                "application/json": {
                    schema: GetTasksResponseSchema
                }
            },
            description: 'タスク一覧'
        }
    }
})