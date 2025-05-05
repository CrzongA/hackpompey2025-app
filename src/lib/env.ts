import {loadEnvConfig} from "@next/env"

const projectDir = process.cwd()
loadEnvConfig(projectDir)

console.assert(process.env.GOOGLE_API_KEY, `GOOGLE_API_KEY not found`)

export const GOOGLE_API_KEY= process.env.GOOGLE_API_KEY ? process.env.GOOGLE_API_KEY:""
export const OPENSTREETMAP_API_KEY= process.env.OPENSTREETMAP_API_KEY ? process.env.OPENSTREETMAP_API_KEY:""
