import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import app from "..";
import { createPostRouter } from "./router";
import type { CreateTaskParamType, CreateTaskResponseType } from "./schema";
import { PrismaClient } from "@prisma/client";
import { executePostRequest } from "../../tests/setup";

const prisma = new PrismaClient()

describe('tasks', () => {
    it('テスト', async () => {
        const body = { title: undefined }
        const res = await executePostRequest(app, createPostRouter.path, body)


        const data: CreateTaskResponseType = await res.json()

        const result = await prisma.task.findUnique({ where: { id: data.id } })
        expect(result).not.toBeNull()
    })

    afterEach(async () => {
        await prisma.task.deleteMany()
    })
})