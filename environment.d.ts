namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production'
    NEXT_PUBLIC_BASE_URL: string
    NEXT_PUBLIC_ACCESS_TOKEN: string
    NEXT_MONGO_URI: string
    NEXT_MONGO_CLOUD_NAME: string
    NEXT_MONGO_API_KEY: string
    NEXT_MONGO_API_SECRET: string
    ACCESS_TOKEN_SECRET: string
    REFRESH_TOKEN_SECRET: string
    CLOUD_NAME: string
    CLOUD_API_KEY: string
    CLOUD_API_SECRET: string
    NEXTAUTH_SECRET: string
  }
}
