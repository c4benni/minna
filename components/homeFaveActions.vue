<script>
import { mountSingleComponent } from './utils/main'
export default {
  name: 'HomeFaveActions',
  data: () => ({
    selfName: 'HomeFaveActions',
    showMore: 1,
  }),
  computed: {
    ...mountSingleComponent.computed,

    items() {
      const lightTheme = this.$theme.light
      return [
        {
          icon: 'moneyDouble',
          title: 'Bills payment',
          color: lightTheme ? '#bba03d' : '#FAD961',
          to: '/blank/payments-page',
        },
        {
          icon: 'sendMoney',
          title: 'Send money',
          color: lightTheme ? '#cfaf30' : '#F4D03F',
          to: '/blank/payments-page',
        },

        {
          icon: 'airtime',
          title: 'Airtime & data',
          color: '#9FACE6',
          to: '/blank/airtime-page',
        },
        {
          icon: 'recieveMoney',
          title: 'Recieve money',
          color: '#2B86C5',
          to: '/blank/payments-page',
        },

        {
          icon: 'requestCard',
          title: 'Request card',
          color: 'var(--primary)',
          to: '/blank/cards-page',
        },
        {
          icon: 'blockCard',
          title: 'Block card',
          color: '#FF2525',
          to: '/blank/cards-page',
        },
        {
          icon: 'beneficiary',
          title: 'Edit beneficiary',
          color: '#08AEEA',
          to: '/blank/payments-page',
        },
        {
          icon: 'history',
          title: 'Transaction history',
          color: lightTheme ? '#2ba578' : '#3EECAC',
          to: '/blank/transaction-history-page',
        },

        {
          icon: 'generateStatement',
          title: 'Generate statement',
          color: lightTheme ? '#1cc168' : '#85FFBD',
          to: '/blank/payments-page',
        },

        {
          icon: 'accountOfficer',
          title: 'Account officer',
          color: '#9599E2',
          to: '/blank/support-page',
        },

        {
          icon: 'bookFlight',
          title: 'Book flight',
          color: '#FBAB7E',
          to: '/blank/payments-page',
        },

        {
          icon: 'restaurants',
          title: 'Restaurants',
          color: lightTheme ? '#26ab62' : '#2AF988',
          to: '/blank/payments-page',
        },

        {
          icon: 'cheque',
          title: 'Cheques',
          color: '#4158D0',
          to: '/blank/payments-page',
        },

        {
          icon: 'foreignExchange',
          title: 'Foreign exchange',
          color: '#FF99AC',
          to: '/blank/payments-page',
        },

        {
          icon: 'cubeSend',
          title: 'Miscellaneous',
          color: '#FF5ACD',
          to: '/blank/payments-page',
        },
      ]
    },
  },
  created() {
    this.updateShowMore(1)
  },
  mounted() {
    mountSingleComponent.mounted.call(this)
  },
  methods: {
    updateShowMore(value) {
      this.showMore = value
    },
  },
  render(h) {
    const scoping = { 'data-hfas': '' }

    const appSection = (d, c) => h('appSection', d, c)
    const icon = (d, c) => h('ui-icon', d, c)
    const div = (d, c) => h('div', d, c)
    const p = (d, c) => h('p', d, c)
    const btn = (d, c) => h('ui-btn', d, c)

    const showMore = this.showMore % 2 == 0 && this.showMore > 1

    const button = ({ iconName, text, key, color, to }) => {
      return btn(
        {
          key,
          attrs: { ...scoping },
          staticClass: 'action',
          props: {
            background: 'theme-primary',
            simpleButton: true,
          },
          style: {
            '--color': color,
          },
          on: {
            '!click': async () => {
              this.$commit('UPDATE_', {
                path: 'headerText',
                value: text,
              })

              await this.$nextTick()

              this.$router.push(to)
            },
          },
        },
        [
          icon({
            attrs: { ...scoping, name: iconName },
            staticClass: 'icon circle fill-before',
          }),

          p(
            {
              attrs: { ...scoping },
              staticClass: 'btn-txt',
            },
            text
          ),
        ]
      )
    }

    return appSection(
      {
        attrs: { title: 'Favourite actions', useHeaderSlots: true },
        scopedSlots: {
          appendHeader: () => {
            return btn(
              {
                attrs: { ...scoping },
                staticClass: 'more-btn',
                props: {
                  text: true,
                },
                on: {
                  click: () => {
                    this.updateShowMore(this.showMore + 1)
                  },
                },
              },
              !showMore ? 'Show more' : 'Show less'
            )
          },
        },
        staticClass: 'home-fave-actions',
      },
      [
        div(
          {
            key: `root-${showMore}`,
            attrs: {
              ...scoping,
            },
            staticClass: 'root',
            class:
              this.showMore > 1
                ? [
                    {
                      'fade-slide-y-appear': true,
                    },
                  ]
                : undefined,
            style:
              this.showMore > 1
                ? {
                    '--slide-y': showMore ? '-4px' : '4px',
                  }
                : undefined,
          },
          [
            this.items.map((item, key) => {
              if (!showMore && key > 5) {
                return null
              }
              return button({
                key,
                iconName: item.icon,
                text: item.title,
                color: item.color,
                to: item.to,
              })
            }),
          ]
        ),
      ]
    )
  },
}
</script>

<style>
.home-fave-actions {
  margin-top: 1rem;
}

.home-fave-actions > .title {
  display: flex !important;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin: 0;
}

.root[data-hfas] {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(max(var(--item-width)), 1fr));
  padding: 1.5rem;
  padding-bottom: 0;
  gap: 0.5rem;
  --appear-duration: 150ms;
  filter: var(--ds-lighter);
}

#ui-root.md-up .root[data-hfas] {
  --item-width: calc(25% - 1rem);
}

.br-xs .root[data-hfas],
.br-sm .root[data-hfas] {
  --item-width: calc(30% - 1rem);
}

.root[data-hfas] .action[data-hfas] {
  display: grid;
  grid-auto-flow: row;
  justify-content: center;
  justify-items: center;
  min-height: 102px;
  font-weight: normal;
  font-size: 0.875rem;
  width: 100%;
  border-radius: 4px;
  --fill-background: var(--color);
}

.icon[data-hfas] {
  position: relative;
  width: 40px;
  height: 40px;
  color: var(--color);
}

.light-theme .icon[data-hfas] {
  opacity: 1;
}

.light-theme .action[data-hfas] {
  background: var(--theme-banner) !important;
}

.icon[data-hfas]::before {
  background: var(--color);
  opacity: 0.25;
}

.btn-txt[data-hfas] {
  white-space: normal;
  padding: 0 4px;
  color: var(--subtitle-c);
}

.more-btn[data-hfas] {
  font-size: 0.9rem !important;
  opacity: var(--t-body);
  text-decoration: underline;
  padding: 0 4px !important;
}
</style>
