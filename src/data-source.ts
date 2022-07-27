import "reflect-metadata"
import { DataSource, Entity } from "typeorm"
import dotenv = require('dotenv')

dotenv.config()

const port = process.env.DB_PORT as unknown as number | undefined

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: port || 5432,
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "root",
    database: process.env.DB_NAME || "NETFLIX_API",
    synchronize: true,
    entities:[`${__dirname}/**/entities/*.{ts,js}`],
    migrations:[`${__dirname}/**/migrations/*.{ts,js}`],

})


