<script>
import { mountComplexComponent } from './utils/main'
export default {
  name: 'BlankPage',
  data: () => ({
    selfName: 'BlankPage',
    renderedComponents: ['CardsRadio'],
  }),
  computed: {
    ...mountComplexComponent.computed,
  },
  watch: {
    ...mountComplexComponent.watch,
  },
  mounted() {
    mountComplexComponent.mounted.call(this)
  },
  methods: {
    ...mountComplexComponent.methods,
  },
  render(h) {
    const scoping = { 'data-blcp': '' }
    const div = (d, c) => h('div', d, c)

    return div(
      {
        attrs: { ...scoping },
        staticClass: 'root',
      },
      [
        h('cards-radio'),
        div(
          {
            key: `root-${this.$store.state.selectedAccount}`,

            staticClass: 'loading-wrap',
          },
          [
            div({
              staticClass: 'load-header ui-skeleton sk-heading',
            }),
            [{}, {}, {}].map((item, key) => {
              return div(
                {
                  key,
                  staticClass: 'load-item',
                },
                [
                  div({
                    staticClass: 'ui-skeleton sk-heading',
                    style: {
                      'margin-bottom': '.75rem',
                      width: key == 0 ? '40%' : key == 1 ? '55%' : '45%',
                    },
                  }),
                  div({
                    staticClass: 'ui-skeleton sk-body',
                    style: {
                      'margin-bottom': '.35rem',
                      width: '70%',
                    },
                  }),
                ]
              )
            }),
          ]
        ),
      ]
    )
  },
}
</script>

<style>
.root[data-blcp] {
  width: 100%;
  display: grid;
  background: var(--theme-primary);
  height: 100%;
  align-content: flex-start;
}

.dark-theme .root[data-blcp] {
  background: var(--theme-inner-surface);
}

.loading-wrap {
  width: 100%;
  max-width: 660px;
  margin: 0 auto;
  display: grid;
  --appear-duation: 100ms;
}

.lg-up .root[data-blcp] .ui-skeleton {
  justify-self: center;
}

.load-header {
  justify-self: flex-start;
  margin: 1.5rem 0.5rem 0 1.5rem;
  height: 64px;
  width: 64px;
  border-radius: 50%;
  overflow: hidden;
  isolation: isolate;
}

.ui-skeleton.load-header:after,
.ui-skeleton.load-header:before {
  border-radius: 0 !important;
}

.load-item {
  padding: 1.5rem;
  display: grid;
  justify-items: flex-start;
  width: 100%;
}
</style>
