// plugins/routes.js
export default defineNuxtPlugin(nuxtApp => {
    const router = nuxtApp.$router
    console.log('Routes:')
    router.options.routes.forEach(route => {
      console.log(route)
    })
  })