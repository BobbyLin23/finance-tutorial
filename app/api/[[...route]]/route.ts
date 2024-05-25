import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { HTTPException } from 'hono/http-exception'

import accounts from '@/app/api/[[...route]]/accounts'
import categories from '@/app/api/[[...route]]/categories'
import transactions from '@/app/api/[[...route]]/transactions'

export const runtime = 'edge'

const app = new Hono().basePath('/api')

app.onError((e, c) => {
  if (e instanceof HTTPException) {
    return e.getResponse()
  }

  return c.json({ error: 'Internal Error' }, 500)
})

const routes = app
  .route('/accounts', accounts)
  .route('/categories', categories)
  .route('/transactions', transactions)

export const GET = handle(app)
export const POST = handle(app)
export const PATCH = handle(app)
export const DELETE = handle(app)

export type AppType = typeof routes
