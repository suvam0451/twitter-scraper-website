import dotenv from 'dotenv'

dotenv.config({ path: './.env.local' })

const backend = {
  host: process.env.BACKEND_HOST || "localhost",
  port: process.env.BACKEND_PORT || "4000",
}

export default {
    backend
}
