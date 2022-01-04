<script>
import { Copy, mountSingleComponent } from './utils/main'
export default {
  name: 'AccountCard',
  props: {
    cardType: {
      type: String,
      default: '1',
    },

    balance: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      default: 'Active',
    },
    accountNumber: {
      type: String,
      default: '',
    },
    tier: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    selfName: 'AccountCard',

    showCopied: false,
  }),
  computed: {
    showPrice() {
      return this.$store.state.showPrice
    },
    ...mountSingleComponent.computed,
  },
  mounted() {
    mountSingleComponent.mounted.call(this)
  },
  methods: {
    toggleShowPrice(value) {
      localStorage.setItem('showBalance', value)

      this.$commit('UPDATE_', {
        path: 'showPrice',
        value,
      })
    },
  },
  render(h) {
    const scoping = { 'data-acd': '' }
    const div = (d, c) => h('div', d, c)
    const p = (d, c) => h('p', d, c)
    const icon = (d, c) => h('ui-icon', d, c)
    const btn = (d, c) => h('ui-btn', d, c)

    const inactive = this.status == 'Inactive'

    return div(
      {
        attrs: { ...scoping },
        staticClass: 'root',
        class: [`type-${this.cardType}`, { inactive }],
      },
      [
        div(
          {
            attrs: { ...scoping },
            staticClass: 'header',
          },
          [
            div(
              {
                attrs: { ...scoping },
                staticClass: 'balance-wrap',
              },
              [
                p(
                  {
                    attrs: { ...scoping },
                    staticClass: 'subtitle',
                  },
                  'Balance'
                ),
                p(
                  {
                    key: `bal-${this.showPrice}`,
                    attrs: { ...scoping },
                    staticClass: 'title fade-appear',
                  },
                  [
                    this.showPrice ? `$${this.balance}` : '$*****',
                    icon({
                      attrs: {
                        ...scoping,
                        name: this.showPrice ? 'eye-off' : 'eye',
                        size: '18px',
                        title: this.showPrice ? 'hide balance' : 'show balance',
                        tabindex: '0',
                      },
                      staticClass: 'cursor-pointer',
                      on: {
                        click: () => {
                          this.toggleShowPrice(!this.showPrice)
                        },
                      },
                    }),
                  ]
                ),
              ]
            ),

            div(
              {
                attrs: { ...scoping },
                staticClass: 'status-wrap',
              },
              [
                p(
                  {
                    attrs: { ...scoping },
                    staticClass: 'subtitle',
                  },
                  'Status'
                ),
                p(
                  {
                    attrs: { ...scoping },
                    staticClass: 'body-c',
                    class: [
                      {
                        'error-text': inactive,
                      },
                    ],
                  },
                  [this.status]
                ),
              ]
            ),
          ]
        ),

        div(
          {
            attrs: { ...scoping },
            staticClass: 'body',
          },
          [
            div(
              {
                attrs: { ...scoping },
                staticClass: 'acc-wrap',
              },
              [
                p(
                  {
                    attrs: { ...scoping },
                    staticClass: 'subtitle',
                  },
                  'Account number'
                ),
                p(
                  {
                    attrs: { ...scoping },
                    staticClass: 'body-c',
                  },
                  [
                    this.accountNumber,

                    icon({
                      attrs: {
                        ...scoping,
                        name: this.showCopied ? 'check' : 'copy',
                        size: '18px',
                        title: 'copy account number',
                        tabindex: '0',
                      },
                      staticClass: 'cursor-pointer',
                      class: [
                        {
                          'copied fill-before success-text pointer-disabled fade-appear':
                            this.showCopied,
                        },
                      ],
                      on: {
                        click: () => {
                          if (!this.showCopied) {
                            Copy({
                              text: this.accountNumber,
                              onSuccess: async () => {
                                this.showCopied = true

                                await this.$sleep(1000)

                                this.showCopied = false
                              },
                            })
                          }
                        },
                      },
                    }),
                  ]
                ),
              ]
            ),

            div(
              {
                attrs: { ...scoping },
                staticClass: 'status-wrap',
              },
              [
                p(
                  {
                    attrs: { ...scoping },
                    staticClass: 'subtitle type',
                  },
                  'Type'
                ),
                p(
                  {
                    attrs: { ...scoping },
                    staticClass: 'body-c line-clamp-1',
                  },
                  this.tier
                ),
              ]
            ),
          ]
        ),

        div(
          {
            attrs: { ...scoping },
            staticClass: 'footer hide-scrollbar',
          },
          [
            {
              title: 'Fund Account',
              disabled: inactive,
              to: '/blank/payment-page',
            },
            {
              title: 'Transaction History',
              canHide: true,
              to: '/blank/transaction-history',
            },
          ].map((item, key) => {
            return btn(
              {
                key,
                props: {
                  tag: 'nuxt-link',
                  to: item.to,
                  disabled: item.disabled,
                  flat: true,
                },
                attrs: { ...scoping, title: item.title },
                staticClass: `action${item.canHide ? ' can-hide' : ' main_'}`,
                on: {
                  '!click': () => {
                    this.$commit('UPDATE_', {
                      path: 'headerText',
                      value: item.title,
                    })
                  },
                },
              },
              [item.title]
            )
          })
        ),
      ]
    )
  },
}
</script>

<style>
.root[data-acd] {
  width: 100%;
  height: 224px;
  border-radius: var(--rounded);
  padding: 0.75rem;
  display: grid;
  grid-template-rows: 72px 1fr 48px;
}

.root[data-acd].type-1 {
  --theme: hsl(281, 100%, 56%);
  --theme-color: #fff;
  background-color: #21d4fd;
  background-image: linear-gradient(19deg, #21d4fd 0%, #b721ff 100%);
}

.root[data-acd].type-2 {
  --theme: gray;
  --theme-color: #000;
  background-color: darkslategray;
  background-image: linear-gradient(160deg, gray 0%, darkslategray 100%);
}

.root[data-acd].type-3 .header[data-acd] {
  text-shadow: 0.5px 1px rgb(0 0 0 / 25%);
}

.root[data-acd].type-3 {
  --theme: #ff2525;
  --theme-color: #fff;
  background-color: #ffe53b;
  background-image: linear-gradient(147deg, #ffe53b -10%, #ff2525 54%);
}

.root[data-acd].type-4 {
  --theme: #2b86c5;
  --theme-color: #fff;
  background-color: #ff3cac;
  background-image: linear-gradient(
    225deg,
    #ff3cac 0%,
    #784ba0 50%,
    #2b86c5 100%
  );
}

.ui-icon[data-acd] {
  pointer-events: initial;
  margin-left: 0.5rem;
  position: relative;
}

.ui-icon[data-acd]::before {
  background: #000;
  opacity: 0.25 !important;
}

.header[data-acd],
.body[data-acd],
.footer[data-acd] {
  display: flex;
  justify-content: space-between;
}

.header[data-acd] {
  height: 72px;
}

.subtitle[data-acd] {
  font-weight: 300;
  font-size: 0.9rem;
  margin-bottom: 2px;
}

.subtitle[data-acd].type {
  justify-content: flex-end;
}

.title[data-acd] {
  font-weight: 600;
  font-size: 1.15rem;
  --appear-duration: 125ms;
}

.body-c[data-acd] {
  font-weight: 400;
  font-size: 1rem;
}

.root[data-acd].type-2 .subtitle[data-acd] {
  color: var(--body-c-d);
}

.root[data-acd].type-2 .title[data-acd],
.root[data-acd].type-2 .body-c[data-acd] {
  color: var(--title-c-d);
}

.root[data-acd].type-3 .subtitle[data-acd],
.root[data-acd].type-1 .subtitle[data-acd],
.root[data-acd].type-4 .subtitle[data-acd] {
  color: var(--body-c-l);
}

.root[data-acd].type-3 .title[data-acd],
.root[data-acd].type-3 .body-c[data-acd],
.root[data-acd].type-1 .title[data-acd],
.root[data-acd].type-1 .body-c[data-acd],
.root[data-acd].type-4 .title[data-acd],
.root[data-acd].type-4 .body-c[data-acd] {
  color: var(--title-c-l);
}

.title[data-acd],
.subtitle[data-acd],
.body-c[data-acd] {
  display: flex;
  align-items: center;
}

.body-c[data-acd].error-text {
  font-weight: 600;
  border-bottom: 0.75px dotted;
}

.footer[data-acd] {
  padding: 0 0.5rem;
  display: grid;
  grid-auto-flow: column;
  column-gap: 0.5rem;
  max-width: 100%;
  overflow: auto hidden;
  filter: var(--ds-lighter);
}

.action[data-acd] {
  background: var(--theme);
  color: var(--theme-color);
  font-size: 1rem;
}

@media screen and (max-width: 350px) {
  .action[data-acd].can-hide {
    display: none;
  }

  .action[data-acd].main_ {
    min-width: 100% !important;
    display: grid;
  }

  .footer[data-acd] {
    grid-template-columns: 1fr;
  }
}
</style>
