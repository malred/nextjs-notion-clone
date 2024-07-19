// drizzle.config.ts
import { defineConfig } from "drizzle-kit"
import type {Config} from 'drizzle-kit'
import * as dotenv from 'dotenv'

dotenv.config({
    path: '.env',
})

// export default {
//     driver: 'pg',
//     schema: "./lib/db/schema.ts",
//     dbCredentials: {
//         connectionString: process.env.DATABASE_URL!,
//     }
// } satisfies Config

export default defineConfig({
    schema: "./lib/db/schema.ts",
    dialect: "postgresql", // "postgresql" | "mysql"
    // driver: "turso", // optional and used only if `aws-data-api`, `turso`, `d1-http`(WIP) or `expo` are used
    dbCredentials: {
        url: process.env.DATABASE_URL!
    }
})
