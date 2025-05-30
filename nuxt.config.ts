// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',

  modules: ['shadcn-nuxt', '@nuxtjs/supabase', '@pinia/nuxt'],
  
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  
  css: ['~/assets/css/tailwind.css'],
  
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  },

  supabase: {
    redirectOptions: {
      login: '/',
      callback: '/confirm',
      include: ['slug', 'id'],
      exclude: [],
      saveRedirectToCookie: false,
    }
  },

  devtools: { enabled: false },
})