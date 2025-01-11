import { z } from '@hono/zod-openapi'
export const CreateTaskParamSchema = z.object({
    title: z.string().min(1).openapi({
        param: {
            name: 'title',
            description: 'タスクのタイトル'
        },
        example: 'タスク1'
    }),
    content: z.string().optional()
})
export type CreateTaskParamType = z.infer<typeof CreateTaskParamSchema>
export const CreateTaskResponseSchema = z.object({
    id: z.string().uuid()
})
export type CreateTaskResponseType = z.infer<typeof CreateTaskResponseSchema>

export const GetTasksQuerySchema = z.object({
    ids: z.string().array().optional().openapi({ title: 'タスクID' })
})

export const GetTasksResponseSchema = z.array(z.object({
    id: z.string(),
    title: z.string(),
    content: z.string().optional()
}))