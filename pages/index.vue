<script>
import { mountComplexPage } from '~/components/utils/main'
export default {
  name: 'RootPage',
  data: () => ({
    selfName: 'RootPage',
    renderedComponents: ['AccountCard', 'HomeFaveActions', 'HomeUpdates'],
  }),
  head() {
    return {
      title: 'Home page',
    }
  },
  computed: {
    ...mountComplexPage.computed,
    accounts() {
      return this.$store.state.accounts
    },
  },
  watch: {
    ...mountComplexPage.watch,
  },
  beforeCreate() {
    this.$commit('UPDATE_', {
      path: 'headerText',
      value: 'Home',
    })
  },
  mounted() {
    mountComplexPage.mounted.call(this)
  },
  methods: {
    ...mountComplexPage.methods,
  },
  render(h) {
    const scoping = { 'data-hpge': '' }
    const div = (d, c) => h('div', d, c)
    const p = (d, c) => h('p', d, c)

    const appSection = (d, c) => h('app-section', d, c)
    const accountCard = (d, c) => h('accountCard', d, c)
    const homeFaveActions = (d) => h('homeFaveActions', d)
    const homeUpdates = (d) => h('homeUpdates', d)

    return div(
      {
        attrs: { ...scoping },
        staticClass: 'root',
      },
      [
        appSection(
          {
            attrs: {
              title: 'Accounts',
              useHeaderSlots: true,
            },
            scopedSlots: {
              appendHeader: () => {
                return p(
                  {
                    attrs: { ...scoping },
                    staticClass: 'account-count',
                  },
                  `${this.accounts.length} accounts`
                )
              },
            },
          },
          [
            div(
              {
                attrs: { ...scoping },
                staticClass: 'account-card-wrap hide-scrollbar',
                style: {
                  '--length': this.accounts.length,
                },
              },
              this.accounts.map((item, key) => {
                return accountCard({
                  key,
                  props: { ...item },
                })
              })
            ),
          ]
        ),

        homeFaveActions(),

        homeUpdates(),
      ]
    )
  },
}
</script>

<style>
.root[data-hpge] {
  padding: 1rem 0;
}

.br-xs .root[data-hpge],
.br-sm .root[data-hpge] {
  padding-bottom: 0;
}

.root[data-hpge] > .root[data-asn]:first-of-type .title {
  display: flex !important;
  justify-content: space-between;
  align-items: center;
}

.account-count[data-hpge] {
  font-size: 0.9rem;
  opacity: var(--t-subtitle);
  font-weight: 500;
}

.account-card-wrap[data-hpge] {
  display: grid;
  grid-template-columns: repeat(var(--length), min(calc(100vw - 3rem), 500px)) 0.75rem;
  grid-column-gap: 1rem;
  -moz-column-gap: 1rem;
  grid-column-gap: 1rem;
  column-gap: 1rem;
  padding: 0 0 0 1.5rem;
  overflow-x: auto;
  overflow-y: hidden;
  overflow-x: auto;
  overflow-y: hidden;
  overflow: auto hidden;
  -ms-scroll-snap-type: x mandatory;
  scroll-snap-type: x mandatory;
  isolation: isolate;
  filter: var(--ds-light);
}

.account-card-wrap[data-hpge]::after {
  content: '';
  width: 0.75rem;
}

.account-card-wrap[data-hpge] > .root {
  scroll-snap-align: center;
}

#ui-root.md-up .account-card-wrap[data-hpge] > .root {
  scroll-snap-align: start;
  scroll-margin-left: 1.5rem;
  scroll-snap-margin-left: 1.5rem;
}
</style>
