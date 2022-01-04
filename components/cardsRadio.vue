<script>
import { mountSingleComponent } from './utils/main'
export default {
  name: 'CardsRadio',

  data: () => ({
    selfName: 'CardsRadio',
  }),
  computed: {
    ...mountSingleComponent.computed,
    selectedAccount() {
      const state = this.$store.state

      return state.accounts[state.selectedAccount]
    },
    accounts() {
      return this.$store.state.accounts
    },
  },
  mounted() {
    mountSingleComponent.mounted.call(this)
  },
  render(h) {
    const scoping = { 'data-cro': '' }
    const div = (d, c) => h('div', d, c)
    const h2 = (d, c) => h('h2', d, c)
    const h3 = (d, c) => h('h3', d, c)
    const h4 = (d, c) => h('h4', d, c)
    const btn = (d, c) => h('ui-btn', d, c)
    const span = (d, c) => h('span', d, c)
    const icon = (d, c) => h('ui-icon', d, c)

    const button = ({ key, accountNumber, tier }) => {
      const isSelected = accountNumber == this.selectedAccount.accountNumber
      return btn(
        {
          ref: `btn-${key}`,
          key,
          attrs: {
            ...scoping,
            title: isSelected ? 'selected' : `select ${accountNumber}`,
          },
          staticClass: 'action',
          props: {
            simpleButton: true,
          },
          on: {
            '!click': () => {
              this.$commit('UPDATE_', {
                path: 'selectedAccount',
                value: key,
              })
            },
          },
        },
        [
          h3(
            {
              attrs: { ...scoping },
              staticClass: 'acc-no',
            },
            accountNumber
          ),
          h4(
            {
              attrs: { ...scoping },
              staticClass: 'acc-type',
            },
            tier
          ),
          isSelected
            ? span(
                {
                  attrs: { ...scoping },
                  staticClass: 'pseudo selected-wrap fill-before fade-appear',
                },
                [
                  icon({
                    attrs: { ...scoping, name: 'check' },
                    staticClass: 'icon primary',
                  }),
                ]
              )
            : null,
        ]
      )
    }

    return div(
      {
        attrs: { ...scoping, title: 'choose account' },
        staticClass: 'root',
      },
      [
        h2(
          {
            attrs: { ...scoping },
            staticClass: 'title',
          },
          'Choose account'
        ),

        div(
          {
            attrs: { ...scoping },
            staticClass: 'wrap hide-scrollbar',
          },
          [
            this.accounts.map((item, key) => {
              return button({
                key,
                accountNumber: item.accountNumber,
                tier: item.tier,
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
.root[data-cro] {
  width: 100%;
  margin: 0 auto;
  background: var(--theme-banner);
  display: grid;
  grid-template-rows: 38px 1fr;
  padding: 0.5rem 0 1rem;
  height: max-content;
}

.lg-up .title[data-cro] {
  text-align: center;
  margin-bottom: 0.5rem;
}

.light-theme .root[data-cro] {
  background: var(--primary);
}

.title[data-cro] {
  font-size: 1rem;
  color: var(--subtitle-c);
  align-self: center;
  padding-left: 1.5rem;
}

.light-theme .title[data-cro] {
  color: var(--subtitle-c-invert);
}

.wrap[data-cro] {
  height: 100%;
  width: 100%;
  display: grid;
  grid-auto-flow: column;
  column-gap: 1rem;
  overflow: auto hidden;
  justify-content: flex-start;
  scroll-snap-type: x mandatory;
  display: grid;
  align-items: center;
  padding-left: 1.5rem;
}

.lg-up .wrap[data-cro] {
  justify-content: center;
}

.wrap[data-cro]::after {
  content: '';
  width: 1.5rem;
  height: 100%;
}

.action[data-cro] {
  padding: 1.5rem !important;
  justify-items: flex-start;
  display: grid;
  grid-auto-flow: row;
  row-gap: 0.25rem;
  scroll-snap-align: start;
  scroll-margin-left: 1.5rem;
  scroll-snap-margin-left: 1.5rem;
  width: min-content;
}

.light-theme .action[data-cro] {
  background: var(--theme-banner);
}

.acc-no[data-cro] {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--title-c);
}

.acc-type[data-cro] {
  font-size: 0.95rem;
  font-weight: 400;
  color: var(--subtitle-c);
}

.selected-wrap[data-cro] {
  display: grid;
  --appear-duration: 150ms;
}

.selected-wrap[data-cro]::before {
  border: 2px solid var(--primary);
}

.ui-icon[data-cro] {
  justify-self: flex-end;
  align-self: flex-start;
  margin: 0.5rem;
  width: 24px !important;
  height: 24px !important;
}

.ui-icon[data-cro] svg {
  height: 20px !important;
  width: 20px !important;
}
</style>
