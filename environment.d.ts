namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production'
    NEXT_PUBLIC_MOVIE_BASE_URL: string
    NEXT_PUBLIC_MOVIE_API_KEY: string
    NEXT_PUBLIC_BASE_IMAGE_URL: string
    NEXT_PUBLIC_BASE_BACK_DROP_IMAGE_URL: string
    NEXT_PUBLIC_ACCESS_TOKEN: string
    NEXT_MONGO_URI: string
    NEXT_MONGO_CLOUD_NAME: string
    NEXT_MONGO_API_KEY: string
    NEXT_MONGO_API_SECRET: string
    ACCESS_TOKEN_SECRET: string
    REFRESH_TOKEN_SECRET: string
  }
}
