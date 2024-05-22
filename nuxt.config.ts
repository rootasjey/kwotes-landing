// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/assets/styles/main.css'],
  devtools: { enabled: true },
  modules: [
    "nuxt-vuefire",
  ],
  routeRules: {
    '/': { ssr: true },
    '/themes': { ssr: true },
    // '/about': { prerender: true },
  },
  vuefire: {
    config: {
      apiKey: process.env.VFIRE_API_KEY,
      authDomain: process.env.VFIRE_AUTH_DOMAIN,
      databaseURL: process.env.VFIRE_DATABASE_URL,
      projectId: process.env.VFIRE_PROJECT_ID,
      storageBucket: process.env.VFIRE_STORAGE_BUCKET,
      messagingSenderId: process.env.VFIRE_MESSAGING_SENDER_ID,
      appId: process.env.VFIRE_APP_ID,
      measurementId: process.env.VFIRE_MEASUREMENT_ID,
    },
    // Enables and initializes the auth module
    auth: {
      enabled: true,
      sessionCookie: true,
    },
    // appCheck: {
    //   // Allows you to use a debug token in development
    //   debug: process.env.NODE_ENV !== 'production',
    //   isTokenAutoRefreshEnabled: true,
    //   provider: 'ReCaptchaV3',
    //   // Find the instructions in the Firebase documentation, link above
    //   key: '...',
    // },
  },
})