<script>
import { mountSingleComponent } from './utils/main'
export default {
  name: 'DetailedButton',
  props: {
    iconName: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    appendIcon: {
      type: Boolean,
      default: true,
    },
    tag: {
      type: String,
      default: 'button',
    },
    props: {
      type: Object,
      default: () => ({}),
    },
  },
  data: () => ({
    selfName: 'DetailedButton',
  }),
  computed: {
    ...mountSingleComponent.computed,

    breakpoints() {
      return this.$store.state.breakpoints
    },
  },
  mounted() {
    mountSingleComponent.mounted.call(this)
  },
  render(h) {
    const scoping = { 'data-dbn': '' }

    const div = (d, c) => h('div', d, c)
    const btn = (d, c) => h('ui-btn', d, c)
    const p = (d, c) => h('p', d, c)
    const icon = (d, c) => h('ui-icon', d, c)

    const mdAndUp = /md-/.test(this.breakpoints.lesser)

    const button = ({ iconName, title, desc, appendIcon }) => {
      return btn(
        {
          attrs: { ...scoping },
          staticClass: 'root',
          class: [
            {
              'no-desc': !this.description,
              'no-append': !appendIcon,
            },
          ],
          props: {
            simpleButton: true,
            tag: this.tag,
            ...this.props,
          },
          on: { ...this.$listeners },
        },
        [
          icon({
            attrs: {
              ...scoping,
              name: iconName,
              //   size: /md-/.test(this.breakpoints.greater) ? '34px' : '24px',
            },
            staticClass: 'lead-icon primary-text theme-surface',
          }),

          div(
            {
              attrs: { ...scoping },
              staticClass: 'desc-wrap',
            },
            [
              p(
                {
                  attrs: { ...scoping },
                  staticClass: 'title truncate-text',
                },
                title
              ),

              desc
                ? p(
                    {
                      attrs: { ...scoping },
                      staticClass: 'desc',
                      class: [
                        {
                          'truncate-text': mdAndUp,
                        },
                      ],
                    },
                    desc
                  )
                : undefined,
            ]
          ),

          appendIcon
            ? icon({
                attrs: { ...scoping, name: 'chevronRight' },
                staticClass: 'trail-icon',
                class: [
                  {
                    'fill-before': mdAndUp,
                  },
                ],
              })
            : null,

          this.$slots.default,
        ]
      )
    }

    return button({
      iconName: this.iconName,
      title: this.title,
      desc: this.description,
      appendIcon: this.appendIcon,
    })
  },
}
</script>

<style>
#ui-root.md-up .root[data-dbn] {
  padding: 1.25rem;
  --icon-size: 64px;
  row-gap: 1rem;
  justify-items: center;
}

#ui-root.light-theme.md-up.can-hover
  .root[data-dbn]:hover
  .lead-icon[data-dbn] {
  box-shadow: var(--raise-light);
  background: var(--theme-banner) !important;
}

.root[data-dbn] {
  display: grid;
  width: 100%;
}

.light-theme .root[data-dbn] {
  background: var(--theme-banner);
}

.desc-wrap[data-dbn] {
  text-align: left;
  max-width: 100%;
  overflow: hidden;
  padding: 0 0.5rem;
  padding-right: 0.25rem;
}

#ui-root.md-up .desc-wrap[data-dbn] {
  text-align: center;
}

#ui-root.md-up .title[data-dbn] {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

#ui-root.md-up .root[data-dbn].no-desc .title[data-dbn] {
  font-size: 1.25rem;
}

#ui-root.md-up .desc[data-dbn] {
  font-size: 1rem;
}

.title[data-dbn] {
  font-size: 1rem;
  font-weight: 500;
  color: var(--title-c);
  margin-bottom: 0.35rem;
  /* padding: 0 1rem; */
}

.desc[data-dbn] {
  font-size: 0.875rem;
  font-weight: 300;
  line-height: 1.4;
  letter-spacing: 0.5px;
  color: var(--subtitle-c);
  /* padding: 0 1rem; */
}

.mini-device .root[data-dbn] {
  column-gap: 0.75rem;
  grid-auto-flow: column;
  padding: 1rem 0.75rem 1rem 1rem !important;
  white-space: initial;
  --icon-size: 38px;
  grid-template-columns: var(--icon-size) 1fr 24px;
}

.mini-device .root[data-dbn].no-append {
  grid-template-columns: var(--icon-size) 1fr;
}

.lead-icon[data-dbn] {
  width: var(--icon-size) !important;
  height: var(--icon-size) !important;
  border-radius: var(--rounded) !important;
}

#ui-root.md-up .lead-icon[data-dbn] {
  --width: 34px !important;
  --height: 34px !important;
}

#ui-root.md-up .lead-icon[data-dbn] svg {
  width: var(--width);
  height: var(--height);
}

.trail-icon[data-dbn] {
  opacity: var(--t-disabled) !important;
}

#ui-root.md-up .trail-icon[data-dbn] {
  width: 32px !important;
  height: 32px !important;
  position: relative;
}

#ui-root.md-up .trail-icon[data-dbn]::before {
  opacity: 0.1;
  background: currentColor;
  content: '';
}
</style>
