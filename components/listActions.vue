<script>
import { mountComplexComponent } from './utils/main'
export default {
  name: 'ListActions',
  props: {
    name: {
      type: String,
      default: '',
    },

    titleTag: {
      type: String,
      default: 'h3',
    },

    items: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    selfName: 'ListActions',
    renderedComponents: ['DetailedButton'],
  }),
  computed: {
    ...mountComplexComponent.computed,

    breakpoints() {
      return this.$store.state.breakpoints
    },
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
    const scoping = { 'data-las': '' }
    const div = (d, c) => h('div', d, c)
    const ul = (d, c) => h('ul', d, c)

    const title = (d, c) => h(this.titleTag, d, c)
    const detailedButton = (d) => h('detailedButton', d)

    const mdAndUp = /md-/.test(this.breakpoints.lesser)

    return div(
      {
        attrs: { ...scoping, title: this.name },
        staticClass: 'root',
        class: [
          {
            'fill-before section-divide-before': mdAndUp,
          },
        ],
      },
      [
        title(
          {
            attrs: { ...scoping },
            staticClass: 'heading',
          },
          this.name
        ),

        ul(
          {
            attrs: { ...scoping },
            staticClass: 'list-wrap',
          },
          [
            this.items.map((item, key, arr) => {
              return detailedButton({
                key,
                props: {
                  iconName: item.prependIcon,
                  title: item.title,
                  tag: 'li',
                  appendIcon: !!item.appendIcon,
                  props: !mdAndUp
                    ? {
                        shape: 'none',
                      }
                    : {},
                },
                attrs: {
                  role: 'listitem',
                },
                on: {
                  click: () => {
                    item?.callback?.()
                  },
                },
                class: [
                  {
                    'rounded-bottom': key + 1 == arr.length && !mdAndUp,
                  },
                ],
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
.root[data-las] {
  background: var(--theme-primary);
  border-radius: 4px;
  margin: 0 0 1rem;
  border-radius: var(--rounded);
  isolation: isolate;
  overflow: hidden;
  position: relative;
  display: grid;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

#ui-root.md-up .root[data-las] {
  background: var(--theme-surface);
  margin-bottom: 0.75rem;
  padding-bottom: 1.5rem;
  border-radius: 0;
  --divide-offset: 1rem;
  --divide-opacity: var(--t-disabled);
}

.list-wrap[data-las] {
  display: grid;
}

#ui-root.md-up .list-wrap[data-las] {
  grid-template-columns: repeat(auto-fit, minmax(calc(50% - 3rem), 1fr));
  gap: 0.75rem;
}

.heading[data-las] {
  font-size: 0.9rem;
  letter-spacing: 0.4px;
  color: var(--subtitle-c);
  padding: 0.75rem 1rem;
  background: var(--theme-inner-surface);
}

#ui-root.md-up .heading[data-las] {
  text-align: center;
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
  background: none;
}
</style>
