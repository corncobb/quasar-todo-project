// Configuration for your app
// https://v2.quasar.dev/quasar-cli-vite/quasar-config-js

import { configure } from 'quasar/wrappers'

const FIREBASE_ENV_KEYS = [
  'FIREBASE_API_KEY',
  'FIREBASE_AUTH_DOMAIN',
  'FIREBASE_DATABASE_URL',
  'FIREBASE_PROJECT_ID',
  'FIREBASE_STORAGE_BUCKET',
  'FIREBASE_MESSAGING_SENDER_ID',
  'FIREBASE_APP_ID'
]

export default configure(function (/* ctx */) {
  return {
    boot: [
      'firebase',
      'router-auth'
    ],

    css: [
      'app.scss'
    ],

    extras: [
      'roboto-font',
      'material-icons'
    ],

    build: {
      target: {
        browser: ['es2019', 'edge88', 'firefox78', 'chrome87', 'safari13.1'],
        node: 'node20'
      },

      vueRouterMode: 'hash',

      // Quasar already auto-exposes every key from a local .env file as
      // process.env.KEY in client code (see readFileEnv/getBuildSystemDefine
      // in @quasar/app-vite) — that's how local `npm run dev`/`npm run build`
      // pick up FIREBASE_* values. On Vercel there is no .env file; its
      // dashboard-configured env vars land in this Node process's real
      // process.env instead, so we forward only the ones actually present
      // here. This must NOT unconditionally include every key, since doing
      // so with an unset key would overwrite (with undefined) the value
      // Quasar already injected from the local .env file.
      env: Object.fromEntries(
        FIREBASE_ENV_KEYS
          .filter(key => process.env[key] !== undefined)
          .map(key => [key, process.env[key]])
      )
    },

    devServer: {
      port: 9000,
      open: false
    },

    framework: {
      config: {},

      components: [
        'QLayout',
        'QHeader',
        'QFooter',
        'QDrawer',
        'QPageContainer',
        'QPage',
        'QToolbar',
        'QToolbarTitle',
        'QBtn',
        'QIcon',
        'QList',
        'QItem',
        'QItemSection',
        'QItemLabel',
        'QTabs',
        'QTab',
        'QRouteTab',
        'QCheckbox',
        'QDialog',
        'QCard',
        'QCardSection',
        'QCardActions',
        'QSpace',
        'QInput',
        'QDate',
        'QPopupProxy',
        'QTime',
        'QForm',
        'QBanner',
        'QSelect',
        'QScrollArea',
        'QToggle',
        'QTabPanels',
        'QTabPanel',
        'QSeparator',
        'QSpinner'
      ],

      directives: [
        'Ripple',
        'ClosePopup',
        'TouchHold'
      ],

      plugins: [
        'Notify',
        'Dialog',
        'LocalStorage',
        'SessionStorage'
      ]
    },

    animations: [
      'zoomIn',
      'zoomOut'
    ],

    pwa: {
      manifest: {
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            src: 'icons/icon-128x128.png',
            sizes: '128x128',
            type: 'image/png'
          },
          {
            src: 'icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icons/icon-256x256.png',
            sizes: '256x256',
            type: 'image/png'
          },
          {
            src: 'icons/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png'
          },
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    }
  }
})
