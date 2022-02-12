import dotenv from 'dotenv'

dotenv.config({ path: './.env' })

console.log(process.env.BACKEND_HOST, process.env.BACKEND_PORT);

const backend = {
  host: process.env.BACKEND_HOST || "localhost",
  port: process.env.BACKEND_PORT || "4000",
}

console.log(backend);

export default {
    backend
}
