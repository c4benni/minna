<script>
import {
  ArrowNavigate,
  eventKey,
  logoSVG,
  mountSingleComponent,
} from './utils/main'
export default {
  name: 'NavBar',
  data: () => ({
    selfName: 'NavBar',
  }),
  computed: {
    ...mountSingleComponent.computed,

    breakpoints() {
      return this.$store.state.breakpoints
    },

    navLinks() {
      const mdAndUp = /md-/.test(this.breakpoints.lesser)

      const match = (str) => {
        const regExp = new RegExp(`${str}`)

        return regExp.test(this.$route.fullPath)
      }

      let main = [
        {
          title: 'Home',
          icon: 'home',
          active: match(mdAndUp ? '^/$' : 'transaction-history(-page)?|^\\/$'),
          to: '/',
        },
        {
          title: 'Payments',
          icon: 'moneyDouble',
          active: match(
            mdAndUp
              ? 'payments|payments?-page'
              : 'payments|payments?-page|airtime'
          ),
          to: '/payments',
        },
        {
          title: 'Cards',
          icon: 'card',
          active: /\/cards|cards-page/.test(this.$route.path),
          to: '/cards',
        },

        {
          title: 'Support',
          icon: 'face-agent',
          active: /\/support|support-page/.test(this.$route.path),

          to: '/support',
        },

        {
          title: 'Profile',
          icon: 'account',
          active: /profile/.test(this.$route.path),
          to: '/profile',
        },
      ]

      if (/md-/.test(this.breakpoints.lesser)) {
        main = main.filter((x) => x.title != 'Profile' && x.title != 'Support')

        main.push(
          {
            title: 'Airtime & data',
            icon: 'airtime',
            active: /airtime/.test(this.$route.path),
            to: '/blank/airtime-page',
          },
          {
            title: 'Transaction history',
            icon: 'history',
            active: /transaction-history/.test(this.$route.path),
            to: '/blank/transaction-history-page',
          },
          {
            title: 'Send money',
            icon: 'sendMoney',
            active: /send-money/.test(this.$route.path),
            to: 'blank/send-money-page',
          },

          {
            title: 'Support',
            icon: 'face-agent',
            active: this.$route.path == '/support',
            to: '/support',
          },

          {
            title: 'Profile',
            icon: 'account',
            active: /profile/.test(this.$route.path),
            to: '/profile',
          }
        )
      }

      return main
    },
  },
  mounted() {
    mountSingleComponent.mounted.call(this)
  },
  render(h) {
    const scoping = { 'data-nbr': '' }
    const nav = (d, c) => h('nav', d, c)

    const span = (d, c) => h('span', d, c)

    const div = (d, c) => h('div', d, c)

    const p = (d, c) => h('p', d, c)

    const btn = (d, c) => h('ui-btn', d, c)

    const icon = (d, c) => h('ui-icon', d, c)

    const mdAndUp = /md-/.test(this.breakpoints.lesser)

    const h1 = (d, c) => h('h1', d, c)

    return nav(
      {
        attrs: {
          ...scoping,
        },
        staticClass: 'root fill-before',
        on: {
          '!keydown': (e) => {
            const key = eventKey(e)

            let arrowNavigate

            if (mdAndUp) {
              if (/arrow_up|arrow_down/.test(key)) {
                arrowNavigate = new ArrowNavigate({
                  root: e.currentTarget,
                  children: '.ui-btn',
                  loop: true,
                  preventScroll: false,
                })

                if (/down/.test(key)) {
                  arrowNavigate.forward()
                } else arrowNavigate.backward()
              }
            } else if (/arrow_left|arrow_right/.test(key)) {
              arrowNavigate = new ArrowNavigate({
                root: e.currentTarget,
                children: '.ui-btn',
                loop: true,
                preventScroll: false,
              })

              if (/right/.test(key)) {
                arrowNavigate.forward()
              } else arrowNavigate.backward()
            }
          },
        },
      },
      [
        mdAndUp
          ? div(
              {
                attrs: { ...scoping },
                staticClass: 'header',
              },
              [
                div(
                  {
                    attrs: {
                      ...scoping,
                      title: 'app logo',
                    },
                    staticClass: 'image',
                  },
                  [logoSVG.call(this, { h })]
                ),
                h1(
                  {
                    attrs: { ...scoping },
                    staticClass: 'title',
                  },
                  [
                    h(
                      'nuxt-link',
                      {
                        staticClass: 'title',
                        attrs: { ...scoping },
                        props: { to: '/' },
                      },
                      ['Minna Bank']
                    ),
                  ]
                ),
              ]
            )
          : null,

        this.navLinks.map((item, key) => {
          return btn(
            {
              key,
              attrs: {
                ...scoping,
                title: item.title,
              },
              staticClass: 'item',
              props: {
                text: true,
                tag: 'nuxt-link',
                to: item.to.replace(/\/blank{2,}/, '/blank'),
                simpleButton: true,
                shape: 'none',
              },
              class: [
                {
                  active_: item.active,
                },
              ],
              on: {
                '!click': () =>
                  this.$commit('UPDATE_', {
                    path: 'headerText',
                    value: item.title,
                  }),
              },
            },
            [
              icon({
                attrs: { ...scoping, name: item.icon },
                staticClass: 'icon',
              }),

              item.title,

              item.active
                ? span({
                    attrs: { ...scoping, 'aria-hidden': 'true' },
                    staticClass: 'pseudo tracker fill-before-after',
                    class: [
                      {
                        'fade-slide-y-appear': !mdAndUp,
                        'fade-slide-x-appear': mdAndUp,
                      },
                    ],
                  })
                : undefined,
            ]
          )
        }),

        mdAndUp
          ? div(
              {
                attrs: { ...scoping },
                staticClass: 'footer',
              },
              [
                btn(
                  {
                    key: 'log-out',
                    attrs: {
                      ...scoping,
                      title: 'logout',
                    },
                    staticClass: 'item',
                    props: {
                      text: true,
                      simpleButton: true,
                      shape: 'none',
                    },
                    on: {
                      '!click': () => {
                        this.$commit('UPDATE_', {
                          value: null,
                          path: 'user',
                        })
                      },
                    },
                  },
                  [
                    icon({
                      attrs: { ...scoping, name: 'logOut' },
                      staticClass: 'icon',
                    }),

                    'Logout',
                  ]
                ),

                p(
                  {
                    attrs: { ...scoping },
                    staticClass: 'copyright',
                  },
                  [`Copyright © ${new Date().getFullYear()}`]
                ),

                p(
                  {
                    attrs: {
                      ...scoping,
                    },
                    staticClass: 'app-name',
                  },
                  ['Minna bank DEMO']
                ),
              ]
            )
          : null,
      ]
    )
  },
}
</script>

<style>
.root[data-nbr] {
  background: var(--theme-banner);
  display: grid;
  position: relative;
}

.light-theme.md-up .root[data-nbr] {
  background: var(--primary);
}

.light-theme.md-up .root[data-nbr] * {
  color: #f5f5f5 !important;
}

.header[data-nbr] {
  position: absolute;
  height: 56px;
  width: 100%;
  left: 0;
  top: 0;
  display: grid;
  grid-auto-flow: column;
  column-gap: 0.75rem;
  justify-content: flex-start;
  align-items: center;
  padding-left: 1.45rem;
}

.title[data-nbr] {
  font-size: 1rem;
  font-weight: 600;
  color: var(--secondary) !important;
  text-decoration: none;
}

.root[data-nbr] .logo-loader {
  --size: 38px;
}

#ui-root.md-up .image[data-nbr] {
  --size: 38px;
}

.br-xs .image[data-nbr],
.br-sm .image[data-nbr] {
  --size: 32px;
}

.image[data-nbr] {
  width: var(--size);
  height: var(--size);
}

#ui-root.md-up .root[data-nbr] {
  position: relative;
  width: var(--nav-width);
  height: 100%;
  align-content: flex-start;
  padding-top: 56px;
  z-index: 1;
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 1;
  grid-row-end: 2;
}

.icon[data-nbr] {
  opacity: var(--t-disabled);
}

.item[data-nbr].active_ .icon[data-nbr] {
  opacity: 1;
}

.br-xs .root[data-nbr],
.br-sm .root[data-nbr] {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: var(--nav-height);
  grid-auto-flow: column;
  grid-template-columns: repeat(5, 20%);
}

#ui-root.md-up .root[data-nbr]::before {
  border-right: var(--ui-divide);
}

#ui-root.md-up.light-theme .root[data-nbr]::before {
  border-right-color: rgba(255, 255, 255, 0.275);
}

.mini-device.light-theme .root[data-nbr]::before {
  border-top: var(--ui-divide);
}

.item[data-nbr] {
  display: grid;
  color: var(--title-c) !important;
  font-weight: 400;
}

#ui-root.md-up .item[data-nbr] {
  transition: 0s !important;
}

.can-hover .item[data-nbr]:hover {
  opacity: 1 !important;
  color: var(--title-c);
}

.footer[data-nbr] {
  position: absolute;
  bottom: 1.5rem;
  width: 100%;
  display: grid;
  row-gap: 0.5rem;
  min-height: 84px;
}

.copyright[data-nbr] {
  font-size: 0.875rem;
  color: var(--caption-c);
  font-weight: 400;
  text-align: left;
  padding: 0 0.5rem 0 30px;
}

#ui-root.md-up .item[data-nbr] {
  grid-auto-flow: column;
  column-gap: 0.75rem;
  width: 100%;
  height: 44px;
  justify-content: flex-start;
  padding: 0 30px !important;
  font-size: 14px !important;
}

#ui-root.br-xl .item[data-nbr] {
  height: 48px !important;
}

.br-sm .item[data-nbr],
.br-xs .item[data-nbr] {
  grid-auto-flow: row;
  justify-items: center;
  align-content: center;
  width: 100%;
  font-size: 0.75rem;
  height: 100%;
  padding: 0.35rem 0.35rem 0.5rem !important;
  opacity: var(--t-subtitle);
}

.item[data-nbr].active_ {
  font-weight: 600 !important;
  opacity: 1 !important;
  color: var(--primary) !important;
}

.md-up .item[data-nbr].active_ {
  color: #fff !important;
}

.tracker[data-nbr] {
  --appear-duration: 150ms;
  z-index: -1;
  --slide-y: 4px;
  --slide-x: -8px;
}

#ui-root.md-up .tracker[data-nbr]::after {
  width: 5px;
  right: 0;
  left: auto;
  background: var(--primary);
  z-index: 1;
}

#ui-root.md-up.light-theme .tracker[data-nbr]::after {
  background: var(--secondary);
}

#ui-root.md-up .tracker[data-nbr]::before {
  background: linear-gradient(
    to right,
    var(--faded-theme-primary),
    var(--primary)
  );
  opacity: var(--t-disabled);
}

#ui-root.md-up.light-theme .tracker[data-nbr]::before {
  background: linear-gradient(to left, var(--secondary), var(--primary));
}

.br-sm .tracker[data-nbr],
.br-xs .tracker[data-nbr] {
  top: 0;
  background: var(--primary);
  height: 2px;
}

.app-name[data-nbr] {
  font-size: 0.85rem;
  color: var(--disabled-c);
  font-weight: 300;
  padding: 0 0.5rem 0 30px;
}

.light-theme.md-up .app-name[data-nbr] {
  color: var(--subtitle-c);
}
</style>
