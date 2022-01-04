const iconSizes = [
  32,
  64,
  72,
  96,
  120,
  128,
  144,
  152,
  192,
  '192',
  256,
  384,
  512,
  '512'
]

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  generate: {
    routes: [
      '/blank/payment-page',
      '/blank/transaction-history',
      '/blank/cards-page',
      '/blank/airtime-page',
      '/blank/transaction-history-page',
      '/blank/send-money-page',
      '/blank/cards-page'
    ]
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - Minna Bank',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'A beutiful Bank app mockup'
      },
      { name: 'format-detection', content: 'telephone=no' },
      { rel: 'icon', type: 'image/x-icon', href: '~static/icon.png' }
    ]
    // link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  router: {
    base: '/minna/'
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~static/main.css'],

  server: {
    port: 8000, // default: 3000
    host: '0.0.0.0' // default: localhost
  }, // other configs

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    // '~/components/portal',
    // '~/components/transition',
    // '~/components/'
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa'
  ],

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    // manifest: {
    //   lang: "en",
    // },
    icon: {
      sizes: iconSizes.map((x) => parseFloat(x))
      // purpose: iconSizes.map((x) =>
      //   typeof x == "string" ? "maskable" : "any"
      // ),
    },
    // icon: false,

    manifest: {
      useWebmanifestExtension: true,
      name: 'Minna Bank by C4Benn',
      short_name: 'Minna-Bank',
      display: 'standalone',
      background_color: '#000',
      theme_color: '#0958a1',
      description: 'A beutiful Bank app mockup',
      lang: 'en',
      dir: 'ltr',
      // icons: ["32", "64", "144", "512"].map((size) => ({
      //   src: `/logo/app-logo-${size}.png`,
      //   sizes:
      //     size == "512"
      //       ? "72x72 96x96 120x120 128x128 152x152 192x192 256x256 384x384"
      //       : `${size}x${size}`,
      //   type: "image/png",
      // })),
      orientation: 'portrait',
      categories: [
        'lifestyle',
        'finance',
        'banking',
        'productivity & finance',
        'productivity'
      ]
    },

    meta: {
      mobileAppIOS: true
    }

    // workbox: {
    //   enabled: true,
    // },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  loading: false,

  pageTransition: {
    name: 'page-transition',
    // mode: '',

    beforeLeave() {
      this.$commit('UPDATE_', {
        path: 'pageTransitionState',
        value: 'beforeLeave'
      })
    },

    leave() {
      this.$commit('UPDATE_', {
        path: 'pageTransitionState',
        value: 'leave'
      })
    },

    afterLeave() {
      this.$commit('UPDATE_', {
        path: 'pageTransitionState',
        value: 'afterLeave'
      })
    },

    beforeEnter() {
      this.$commit('UPDATE_', {
        path: 'pageTransitionState',
        value: 'beforeEnter'
      })
    },

    enter() {
      this.$commit('UPDATE_', {
        path: 'pageTransitionState',
        value: 'enter'
      })
    },

    afterEnter() {
      if (process.client) {
        if (this) {
          const store = this.$store

          store.commit('UPDATE_', {
            path: 'pageTransitionState',
            value: 'afterEnter'
          })

          // this.$nextTick(() => {
          //   document.documentElement.scrollTo(0, store.state.scrollPosition.y)

          //   requestAnimationFrame(() => {
          //     store.state.pageTransition == 'enter' &&
          //       store.commit('UPDATE_', {
          //         path: 'pageTransitionState',
          //         value: 'afterEnter'
          //       })

          //     requestAnimationFrame(() => {
          //       store.commit('UPDATE_', {
          //         path: 'pageTransition',
          //         value: false
          //       })
          //     })
          //   })

          //   // store.commit('vmodel/TOGGLE', {
          //   //   path: 'loadingBar',
          //   //   value: false
          //   // })
          // })
        }
      }
    }

    // beforeEnter: (e) => {
    //   if (process.client) {
    //     const vue = e.__vue__ ? e.__vue__ : window.$nuxt;

    //     if (vue) {
    //       const store = vue.$store;
    //       vue.$nextTick(() =>
    //         requestAnimationFrame(async () => {
    //           await store.state.sleep.call(vue, 10, true);

    // document.documentElement.scrollTo(
    //   0,
    //   store.state.scrollPosition.y
    // );
    //         })
    //       );
    //     }
    //   }
    // },
  }
}
