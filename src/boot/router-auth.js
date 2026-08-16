import { LocalStorage } from 'quasar'

// "async" is optional
export default ({ router }) => {
  // Note: Quasar automatically registers a Pinia plugin that exposes the
  // router as `this.router` inside every store's actions (see stores/index.js
  // auto-detection + generated app.js) — no manual wiring needed here.

  router.beforeEach((to, from, next) => {
    let loggedIn = LocalStorage.getItem('loggedIn')
    if (!loggedIn && to.path !== '/auth') {
      next('/auth')
    } else {
      next()
    }
  })
}
