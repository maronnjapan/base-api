import { OpenAPIHono } from '@hono/zod-openapi'
import { registerTodoRoutes } from './tasks/controller'
import { prismaMiddleware } from './middlewares/init-prisma-client.middleware'

const app = new OpenAPIHono()
app.use('*', prismaMiddleware)
registerTodoRoutes(app)

app.doc('/doc', {
  openapi: '3.0.0',
  info: {
    title: 'Todo アプリのAPI',
    version: '1.0.0'
  }
})
export default app
