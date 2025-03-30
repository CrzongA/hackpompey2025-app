import {loadEnvConfig} from "@next/env"

const projectDir = process.cwd()
loadEnvConfig(projectDir)

export const GOOGLE_API_KEY= process.env.GOOGLE_API_KEY ? process.env.GOOGLE_API_KEY:""
