import { Hono } from 'hono'
import { OAuth2Client } from 'google-auth-library'

const client = new OAuth2Client()

const app = new Hono()

const api = new Hono()

api
.post('/auth/login', async (c) => {
  const data = await c.req.json()
  const idToken = data?.credentials
  const ticket = await client.verifyIdToken({ idToken })
  const payload = ticket.getPayload()
  return c.json({ user: payload?.email, token: 'token'})
})

app.route('/api', api)

export default app