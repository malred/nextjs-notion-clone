// lib/clerk-server.ts
// import {Clerk} from '@clerk/backend'
import {createClerkClient} from '@clerk/backend'

// export const clerk = Clerk({
export const clerk = createClerkClient({
    // apiKey: process.env.CLERK_SECRET_KEY
    secretKey: process.env.CLERK_SECRET_KEY
})