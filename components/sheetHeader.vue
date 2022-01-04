<script>
import { mountSingleComponent } from './utils/main'
export default {
  name: 'SheetHeader',
  props: {
    title: {
      type: String,
      default: undefined,
    },
  },
  data: () => ({
    selfName: 'SheetHeader',
  }),

  computed: {
    ...mountSingleComponent.computed,
  },
  mounted() {
    mountSingleComponent.mounted.call(this)
  },
  render(h) {
    const scoping = { 'data-shr': '' }
    const header = (d, c) => h('div', d, c)
    const h2 = (d, c) => h('h2', d, c)
    const icon = (d, c) => h('ui-icon', d, c)

    return header(
      {
        attrs: { ...scoping, title: this.title },
        staticClass: 'root',
      },
      [
        this.title
          ? h2(
              {
                attrs: { ...scoping },
                staticClass: 'title line-clamp-1',
              },
              [this.title]
            )
          : null,
        icon({
          attrs: {
            ...scoping,
            name: 'close',
            tabindex: '0',
            title: 'close',
          },
          staticClass: 'action cursor-pointer',
          on: {
            '!click': () => {
              this.$emit('close-clicked')
            },
          },
        }),
      ]
    )
  },
}
</script>

<style>
.root[data-shr] {
  height: var(--sheet-header-height);
  width: 100%;
  position: relative;
  display: grid;
  place-items: center;
  background: var(--theme-banner);
}

.light-theme .root[data-shr] {
  background: var(--primary);
}

.light-theme .title[data-shr],
.light-theme .action[data-shr] {
  color: #fff;
}

.title[data-shr] {
  font-size: 1.25rem;
  font-weight: 500;
  color: var(--title-c);
}

.action[data-shr] {
  width: 42px !important;
  height: 42px !important;
  position: absolute;
  right: 0.75rem;
  pointer-events: initial;
}
</style>
