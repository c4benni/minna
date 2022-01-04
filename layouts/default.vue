<script>
/* eslint-disable promise/param-names */
import Vue from 'vue'
import smoothscroll from 'smoothscroll-polyfill'

import registerComponents from '~/components/utils/registerComponents'

import breakpoints from '~/components/utils/breakpoints.js'
import {
  breakpointsClasses,
  logoSVG,
  mediaListener,
  nextAnimFrame,
  nextFrame,
  setTouchDevice,
  sleep,
} from '~/components/utils/main'

export default {
  name: 'AppRoot',
  // keepAlive: true,

  data() {
    return {
      ...breakpoints.data,

      appMounted: false,
      loaded: false,
    }
  },

  head() {
    const links = []

    links.push(
      {
        hid: 'google-font-preconnect',
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
      {
        hid: 'gstatic-preconnect',
        rel: 'preconnect',
        crossorigin: 'true',
        href: 'https://fonts.gstatic.com',
      },
      // {
      //   hid: 'bangers',
      //   href: 'https://fonts.googleapis.com/css2?family=Bangers&display=swap',
      //   rel: 'stylesheet'
      // },
      {
        hid: 'roboto',
        href: 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,600;0,900;1,100;1,300;1,400;1,500;1,600&display=swap',
        rel: 'stylesheet',
      }
      // {
      //   hid: 'main-styles',
      //   rel: 'stylesheet',
      //   href: '/main.css',
      // }
    )

    if (this.$c4.mounted) {
      links.push(
        {
          hid: 'animations',
          rel: 'preload',
          as: 'style',
          href: 'animations.css',
        },
        {
          hid: 'animations',
          rel: 'stylesheet',
          href: 'animations.css',
        }
      )
    } else {
      links.push(
        {
          hid: 'initial-theme-styles-preload',
          rel: 'preload',
          as: 'style',
          href: `initialTheme.css`,
        },
        {
          hid: 'initial-theme-styles',
          rel: 'stylesheet',
          href: `initialTheme.css`,
        }
      )
    }

    const headerText = this.$store.state.headerText

    return {
      title: headerText ? headerText + ' page' : 'Welcome',
      link: [...links],
      //   style: [{ cssText: styles, type: 'text/css', hid: 'ui-styles' }],
      htmlAttrs: {
        id: 'bank-app',
        lang: 'el',
      },
    }
  },

  computed: {
    ...breakpoints.computed,

    pageEntered() {
      return this.$store.getters.pageEntered
    },
  },

  watch: {
    '$store.state.user'(n) {
      if (!n) {
        this.$commit('UPDATE_', {
          path: 'notificationClicked',
          value: false,
        })

        if (this.$route.fullPath != '/') {
          this.$router.replace('/')
        }
        localStorage.removeItem('user')

        if (process.client) {
          window.scrollTo(0, 0)
        }
      }
    },
    '$theme.light'() {
      this.$el
        .closest('html')
        .classList.replace(
          this.$theme.light ? 'dark-theme' : 'light-theme',
          this.$theme.light ? 'light-theme' : 'dark-theme'
        )
    },

    $route(n, o) {
      this.setGreetings()

      if (n.path != o.path) {
        this.$commit('UPDATE_', {
          path: 'active',
          innerPath: 'rootModal',
          value: false,
        })
      }
    },

    '$c4.overlays'() {
      if (this.$c4.overlays.length) {
        if (!this.$c4.htmlOverlayClassAdded) {
          this.$c4.htmlOverlayClassAdded = true
          const html = this.$el.closest('html')
          html.style.setProperty(
            '--padding-right',
            `${innerWidth - html.clientWidth}px`
          )
          requestAnimationFrame(() => {
            html.classList.add('overlay-active')
          })
        }
      } else {
        const html = this.$el.closest('html')

        html.classList.remove('overlay-active', 'no-overlay')

        html.style.removeProperty('--padding-right')

        this.$c4.htmlOverlayClassAdded = false
      }
    },

    async '$store.state.vmodel.pageVisible'(n) {
      if (n) {
        await this.$nuxt.refresh()

        setTouchDevice.call(this)

        this.$nuxt.refreshOnlineStatus()

        this.setGreetings()
      }
    },
  },

  beforeCreate() {
    registerComponents(Vue)

    Vue.prototype.$commit = this.$store.commit

    Vue.prototype.$pageEntered = this.$store.getters.pageEntered

    Vue.prototype.$loadedComponent = (str) =>
      !!this.$store.state.fetched.components[str]

    class Theme {
      constructor() {
        this.current = '...'
      }

      get is() {
        return this.current
      }

      set is(val) {
        this.current = val
      }

      get light() {
        return /light/i.test(this.current)
      }

      get dark() {
        return /dark/i.test(this.current)
      }

      set light(val) {
        if (val) {
          this.current = 'light'
        } else this.current = 'dark'
      }

      set dark(val) {
        if (val) {
          this.current = 'dark'
        } else this.current = 'light'
      }
    }

    class C4UiLib {
      constructor() {
        this.theme = Vue.observable(new Theme())
        this.componentZIndex = []
        this.overlays = []
        this.htmlOverlayClassAdded = false
        this.loadedImages = []
        this.currencies = {
          naira: '₦',
        }
        this.mounted = false
        this.loadEventFired = false
      }
    }

    Vue.prototype.$c4 = Vue.observable(new C4UiLib())

    Vue.prototype.$theme = Vue.prototype.$c4.theme
  },

  created() {
    this.setGreetings()
  },

  beforeMount() {
    if (!this.$store.state.user && this.$route.fullPath != '/') {
      this.$router.replace('/')
    }
    // this.$commit('UPDATE_', {
    //   path: 'idbWorker',
    //   value: new Worker('/workers/iw.js'),
    //   caller: 'appMounted',
    // })

    const setPrototype = () => {
      Vue.prototype.$nextFrame = nextFrame.bind(this)

      Vue.prototype.$nextAnimFrame = nextAnimFrame.bind(this)

      Vue.prototype.$sleep = sleep
    }

    setPrototype()

    breakpoints.mounted.call(this)

    setTouchDevice.call(this)

    const setTheme = (val) => {
      this.$theme.is = val
      ;(
        document.documentElement || document.getElementsByTagName('html')[0]
      ).classList.add(this.$theme.light ? 'light-theme' : 'dark-theme')
    }

    const currentTheme = window.matchMedia('(prefers-color-scheme: light)')

    if (currentTheme?.matches) {
      setTheme('light')
    } else setTheme('dark')

    mediaListener({
      media: currentTheme,
      callback: (e) => {
        if (e.matches) {
          setTheme('light')
        } else setTheme('dark')
      },
    })

    // this.$nextTick(() => {
    //   this.$store.state.worker.addEventListener?.(
    //     'message',
    //     this.workerCallback,
    //     { passive: true }
    //   )
    // })

    // this.addRootEvents()

    window.history.scrollRestoration = 'auto'

    // setLocalStorage.call(this, 'mounted')
  },

  mounted() {
    let user = localStorage.getItem('user')

    if (user) {
      user = JSON.parse(user)
    }

    if (user?.remember) {
      this.$commit('UPDATE_', {
        path: 'user',
        value: user,
      })
    }

    user = 0

    let showBalance = localStorage.getItem('showBalance')

    if (showBalance) {
      this.$commit('UPDATE_', {
        path: 'showPrice',
        value: true,
      })
    }

    showBalance = 0

    this.$nextTick(async () => {
      this.appMounted = true

      smoothscroll.polyfill()

      // const reduceMotion = window.matchMedia(
      //   "(prefers-reduced-motion: reduce)"
      // );

      // const setMotion = (value) => {
      //   this.$commit("UPDATE_PREFERNCE", {
      //     value: !value,
      //     path: "reduceMotion",
      //   });
      // };

      // setMotion(reduceMotion.matches);

      // reduceMotion.addEventListener("change", (e) => {
      //   setMotion(e.matches);
      // });

      const togglePageVisiblity = () => {
        const hidden =
          document.hidden || document.webkitHidden || document.msHidden
        const visibility =
          document.visibilityState ||
          document.webkitVisibilityState ||
          document.msVisibilityState
        const documentHidden = !!hidden || /^hidden/i.test(visibility)
        const toggleVisibility = (value) => {
          this.$commit('V_MODEL', {
            value,
            path: 'pageVisible',
          })
        }

        if (documentHidden) {
          toggleVisibility(false)
        } else toggleVisibility(true)
      }

      togglePageVisiblity()

      document.addEventListener('visibilitychange', togglePageVisiblity)

      await this.$sleep(200, true)

      Object.entries(this.$store.state).forEach((x) => {
        this.$commit('UPDATE_', {
          path: x[0],
          value: x[1],
        })
      })

      await this.$nextTick()

      this.$commit('UPDATE_', {
        path: 'pageTransitionState',
        value: 'afterEnter',
      })

      await this.$sleep(200)

      this.showUserPrefTheme = false
      this.loaded = true
      this.$c4.mounted = true

      // const deliveryInfo = localStorage.getItem('delivery-info')

      // if (deliveryInfo) {
      //   const value = JSON.parse(deliveryInfo)

      //   value.saved &&
      //     this.$commit('UPDATE_', {
      //       name: 'savedDeliveryInfo',
      //       value,
      //     })
      // }

      // this.$sleep(2000, true).then(() => {
      //   this.canPrefetch = true
      // })

      // const handleParallax = (e) => {
      //   const scrollEl = e?.currentTarget?.scrollingElement;
      //   const $pageY = scrollEl ? scrollEl.scrollTop : window.pageYOffset;

      //   requestAnimationFrame(() => {
      //     this.$commit("UPDATE_PARALLAX", $pageY);
      //   });
      // };

      // document.addEventListener("scroll", handleParallax, {
      //   passive: true,
      // });
    })
  },

  beforeDestroy() {
    // this.$store.state.worker.removeEventListener?.(
    //   'message',
    //   this.workerCallback,
    //   { passive: true }
    // )

    // localStorage.setItem(
    //   'scrollPosition',
    //   JSON.stringify({
    //     x: pageXOffset,
    //     y: pageYOffset,
    //   })
    // )

    this.$store.state.user &&
      localStorage.setItem('user', JSON.stringify(this.$store.state.user))

    // this.removeRootEvents()
  },

  methods: {
    ...breakpoints.methods,

    setGreetings() {
      const greeting = () => {
        const hr = new Date().getHours()

        if (hr >= 0 && hr < 12) {
          return 'morning'
        }
        if (hr >= 12 && hr < 17) {
          return 'afternoon'
        }
        return 'evening'
      }

      this.$commit('UPDATE_', {
        name: 'greeting',
        value: greeting(),
      })
    },

    // findMountedComponent(str) {
    //   const found = this.$store.state.fetched.components.includes(str)

    //   if (found) {
    //     this.prefetchComponents = this.prefetchComponents.filter(
    //       (x) => x != str
    //     )
    //   }

    //   return found
    // },

    // workerCallback(e) {
    //   if (e.data.name == '$store') {
    //     if (/section/i.test(e.data.type)) {
    //       if (!this.$store.state.$store.shopSection) {
    //         this.$commit('UPDATE_', {
    //           path: 'shopSection',
    //           innerPath: '$store',
    //           value: {},
    //         })
    //       }

    //       this.$commit('UPDATE_', {
    //         path: e.data.path,
    //         innerPath: '$store.shopSection',
    //         value: e.data.value,
    //       })
    //     } else {
    //       this.$commit('UPDATE_', {
    //         path: e.data.path,
    //         innerPath: '$store',
    //         value: e.data.value,
    //       })
    //     }
    //   }
    // },

    // async fetchStore() {
    //   const store = this.$store
    //   const supabase = store.getters.supabase
    //   const { data: products, error } = await supabase
    //     .from('products')
    //     .select('*')

    //   const $storeError = (error) =>
    //     store.commit('UPDATE_', {
    //       path: '$store',
    //       value: { error },
    //     })

    //   const subscribe = ({ cb, path }) => {
    //     supabase.from(path).on('*', cb).subscribe()
    //   }

    //   // console.log(3)

    //   if (products) {
    //     this.$store.state.worker.postMessage({
    //       name: '$store',
    //       products,
    //     })

    //     subscribe({
    //       path: 'products',
    //       cb: (e) => console.log(e),
    //     })

    //     const fetchCampaigns = async () => {
    //       const { data: campaigns, error } = await supabase
    //         .from('campaigns')
    //         .select('*')

    //       if (campaigns) {
    //         this.$commit('UPDATE_', {
    //           path: 'campaigns',
    //           innerPath: '$store',
    //           value: campaigns,
    //         })

    //         subscribe({
    //           path: 'campaigns',
    //           cb: (e) => console.log(e),
    //         })
    //       } else {
    //         $storeError(error)
    //       }
    //     }

    //     fetchCampaigns()
    //   } else {
    //     $storeError(error)
    //   }
    // },

    updatePageTitle() {
      this.$commit('UPDATE_', {
        path: 'showPageTitle',
        value: !/shop-add_to_bag-id|search/i.test(this.$route.name),
      })
    },
    // toggleRootEvents(action) {
    //   let html =
    //     document.documentElement || document.getElementsByTagName('html')[0]

    //   // ;[
    //   //   'animationstart',
    //   //   'animationcancel',
    //   //   'animationend',
    //   //   'transitionstart',
    //   //   'transitionend',
    //   //   'touchstart',
    //   //   'touchmove',
    //   //   'touchcancel',
    //   //   'touchend',
    //   //   'mousedown',
    //   //   'mousemove',
    //   //   'mouseup',
    //   //   'mouseenter',
    //   //   'keydown',
    //   //   'keyup',
    //   //   'blur',
    //   //   'click',
    //   // ].forEach((x) => html[`${action}EventListener`](x, () => {}))

    //   // html = 0
    // },
    // addRootEvents() {
    //   this.toggleRootEvents('add')
    // },
    // removeRootEvents() {
    //   this.toggleRootEvents('remove')
    // },
  },

  render(h) {
    const div = (d, c) => h('div', d, c)
    const main = (d, c) => h('main', d, c)
    const Nuxt = () => h('nuxt')

    const navBar = h('nav-bar')
    const appBar = h('app-bar')
    // const appHeader = h('app-header')
    // const footer = (d) => h('appFooter', d)
    // const loadingBar = (d) => h('loading-bar', d)

    const rootModal = (d, c) => h('rootModal', d, c)

    // const mdAndUp = /md-/.test(this.$store.state.breakpoints.lesser)

    const signedIn = !!this.$store.state.user

    return div(
      {
        domProps: {
          id: 'ui-root',
        },
        staticClass: 'theme-surface',
        class: [
          `${this.$theme.is}-theme`,
          this.$store.state.pageTransition,
          {
            'not-signed-in': !this.$store.state.user,
            // 'reduced-motion': this.$store.state.userPreference.reduceMotion,
            // 'root-banner': this.$store.state.rootBanner?.render,
            // 'hide-x-overflow': this.$store.state.hideXOverflow,
            // 'hide-bottom-bar': /\/welcome|\/reset_password/i.test(
            //   this.$route.path
            // ),
            'touch-device': this.$store.state.isTouchDevice,
            'strict-touch': this.$store.state.isStrictTouchDevice,
            'can-hover': !this.$store.state.isStrictTouchDevice,
            'fill-before': this.$store.state.breakpoints.is == 'xl',
            // 'search-page': this.$route.name == 'search',
            // '__search-focused':
            //   this.$store.state.searchFocused && this.searchPage,
            'page-transitioning': !this.pageEntered,
            // 'relative-header': /add_to_bag/i.test(this.$route.path),
          },
          breakpointsClasses.call(this),
        ],
        on: {
          '&mousedown': () => {},
          '&mousemove': () => {},
          '&mouseup': () => {},
          '&touchstart': () => {},
          '&touchmove': () => {},
          '&touchcancel': () => {},
          '&touchend': () => {},
          '&keydown': () => {},
          '&keyup': () => {},
          '&blur': () => {},
          '&click': () => {},
        },
      },
      [
        signedIn
          ? [
              appBar,

              main(
                {
                  staticClass: 'app-main',
                  class: [
                    {
                      hidden: !this.$c4.mounted,
                      'pb-0': this.$route.name == 'blank-name',
                    },
                  ],
                },
                [Nuxt()]
              ),

              navBar,

              // /shop\/add_to_bag/i.test(this.$route.path) ? null : footer(),
              this.$c4.mounted && this.pageEntered
                ? [
                    div(
                      {
                        key: `${this.pageEntered}-app-overlay`,
                        domProps: {
                          id: 'app-overlays',
                        },
                      },
                      [rootModal()]
                    ),
                  ]
                : null,
            ]
          : [h('welcomePage')],
        !this.loaded ||
        this.$store.state.showPageLoading ||
        this.$store.state.signingIn
          ? div(
              {
                staticClass: 'first-loading-page',
                class: [
                  {
                    'signing-in': this.$store.state.signingIn,
                  },
                ],
                on: {
                  wheel: (e) => {
                    e.stopPropagation()
                    e.preventDefault()
                  },
                },
              },
              [
                div(
                  {
                    staticClass: 'logo-load-wrap',
                  },
                  [1].map(() => {
                    return logoSVG.call(this, {
                      h,
                    })
                  })
                ),
                h('h2', { staticClass: 'loading-title' }, [
                  !signedIn && this.$store.state.signingIn
                    ? 'Signing in...'
                    : 'Loading...',
                ]),
              ]
            )
          : null,
        // loadingBar({
        //   props: {
        //     showLoading: this.$store.state.vmodel.loadingBar,
        //   },
        // }),

        // rootFab(),
      ]
    )
  },
}
</script>

<style>
#__layout {
  min-width: 100vw;
  min-height: 100vh;
  display: grid;
  justify-items: center;
}

#ui-root {
  background: var(--theme-surface);
  --max-width: 2060px;
  min-width: min(var(--max-width), 100vw);
  max-width: var(--max-width);
  min-height: 100vh;
  height: 100%;
  display: grid;
  grid-auto-flow: row;
  grid-template-rows: 1fr;
  --sheet-header-height: 50px;
  position: relative;
  width: 100%;
}

#ui-root.br-xl::before {
  border: var(--ui-divide);
  border-width: 0 0.75px;
  z-index: 10;
  opacity: 0.5;
}

#ui-root.md-up {
  --nav-width: 232px;
  --nav-height: 0px;
  --header-height: 56px;
  overflow: hidden;
  display: grid;
  grid-template-columns: var(--nav-width) 1fr;
}

#ui-root.not-signed-in {
  grid-template-columns: 1fr;
}

#ui-root.br-xl {
  --nav-width: 256px !important;
}

.br-xs,
.br-sm {
  --nav-width: 0;
  --nav-height: 56px;
  --header-height: 48px;
}

.first-loading-page {
  width: min(var(--max-width), 100vw);
  position: fixed;
  top: 0;
  background-color: var(--theme-surface);
  z-index: 13000;
  touch-action: none;
  display: grid;
  align-items: center;
  row-gap: 0.75rem;
  align-content: center;
  justify-items: center;
  place-items: center;
  height: 100%;
}

.first-loading-page.signing-in {
  background: rgba(0, 0, 0, 0.75);
}

.first-loading-page.signing-in .loading-title {
  color: #fff;
}

.first-loading-page .loading-title {
  font-size: 1rem;
  letter-spacing: 0.4px;
  text-transform: uppercase;
  font-weight: 400;
  color: var(--caption-c);
}

.loading-page {
  width: 200%;
  width: var(--width, 200%);
  height: calc(100% - var(--nav-bar-height));
  height: var(--height, calc(100% - var(--nav-bar-height)));
  position: fixed;
  left: -50%;
  bottom: var(--nav-bar-height);
  bottom: var(--bottom, var(--nav-bar-height));
  background-color: var(--theme-surface);
  z-index: 13000;
  touch-action: none;
  display: grid;
  align-items: center;
  justify-items: center;
  place-items: center;
}

.app-main {
  position: relative;
  justify-self: flex-end;
  padding-bottom: var(--nav-height);
}

.app-main.pb-0 {
  padding-bottom: 0;
}

.br-xs .app-main,
.br-sm .app-main {
  width: calc(min(100vw, var(--max-width)) - var(--nav-width));
  height: calc(100% - var(--nav-height));
  justify-self: initial;
  align-self: flex-start;
  padding-top: var(--header-height);
}

#ui-root.md-up .app-main {
  width: 100%;
  height: calc(100% - var(--header-height));
  max-height: calc(100vh - var(--header-height));
  overflow: hidden auto;
  align-self: flex-end;
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 2;
}

@keyframes logo-loader {
  0% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  50% {
    -webkit-transform: scale(1.3);
    transform: scale(1.3);
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}

@keyframes logo-load-wrap {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.logo-loader {
  --size: 44px;
  height: var(--size);
  width: var(--size);
}

.first-loading-page .logo-loader {
  animation: logo-loader 1.5s infinite ease-in-out both;
}

.logo-load-wrap {
  animation: logo-load-wrap 3.5s infinite alternate-reverse ease;
}

.md-up .logo-loader {
  --size: 64px;
}

@media screen and (min-width: 959px) {
  .logo-loader {
    --size: 64px;
  }
}
</style>
