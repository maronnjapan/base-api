import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import app from "..";
import { createPostRouter } from "./router";
import type { CreateTaskParamType, CreateTaskResponseType } from "./schema";
import { PrismaClient } from "@prisma/client";
import { executePostRequest } from "../../tests/setup";
import * as mockMiddleware from "../middlewares/verify-access-token.middleware";


vi.mock('../middlewares/verify-access-token.middleware')

const prisma = new PrismaClient()
describe('tasks', () => {

    beforeAll(() => {
        vi.mocked(mockMiddleware.verifyAccessTokenMiddleware).mockImplementation(async (context, next) => {
            await next()
        })
    })

    it('テスト', async () => {
        const body: CreateTaskParamType = { title: 'test' }
        const res = await executePostRequest(app, createPostRouter.path, body)

        const data: CreateTaskResponseType = await res.json()

        const result = await prisma.task.findUnique({ where: { id: data.id } })
        expect(result).not.toBeNull()
    })

    afterEach(async () => {
        await prisma.task.deleteMany()
    })
})