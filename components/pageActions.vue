<script>
import { mountComplexComponent } from '~/components/utils/main'
export default {
  name: 'PageActions',
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    selfName: 'PageActions',
    renderedComponents: ['DetailedButton'],
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
    const scoping = { 'data-pas': '' }
    const div = (d, c) => h('div', d, c)

    const detailedButton = (d) => h('detailedButton', d)

    return div(
      {
        attrs: { ...scoping },
        staticClass: 'root',
      },
      [
        div(
          {
            attrs: {
              ...scoping,
            },
            staticClass: 'wrap',
          },
          [
            this.items.map((item, key) => {
              return detailedButton({
                key,
                props: {
                  title: item.title,
                  description: item.desc,
                  iconName: item.icon,
                  appendIcon: true,
                },
                on: {
                  '!click': () => {
                    this.$emit('detail-btn-click', key)
                  },
                },
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
.wrap[data-pas] {
  filter: var(--ds-lighter);
  display: grid;
  padding: 1.5rem;
  grid-template-columns: repeat(auto-fill, minmax(calc(50% - 3rem), 1fr));
  gap: 1rem;
  max-width: 1200px;
  margin: 0 auto;
}

#ui-root.md-up .wrap[data-pas] {
  padding-top: 3rem;
}

.br-sm .wrap[data-pas],
.br-xs .wrap[data-pas] {
  grid-auto-flow: row;
  grid-template-columns: 1fr;
  gap: 1rem 0;
}
</style>
