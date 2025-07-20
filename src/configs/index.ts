const development = {
  app: {
    port: process.env.DEV_APP_PORT || 3000,
  },
  api: {
    url: process.env.DEV_API_URL || 'http://localhost:8000/v1',
  },
}

const production = {
  app: {
    port: process.env.PRO_APP_PORT || 3000,
  },
  api: {
    url: process.env.PRO_API_URL || 'http://localhost:8000/v1',
  },
}

const config = { development, production }
const env: 'development' | 'production' = process.env.NODE_ENV as 'development' | 'production' || 'development'

export default config[env];