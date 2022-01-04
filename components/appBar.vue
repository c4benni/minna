<script>
import { mountSingleComponent } from './utils/main'
export default {
  name: 'AppBar',
  data: () => ({
    selfName: 'AppBar',
  }),
  computed: {
    ...mountSingleComponent.computed,
    breakpoints() {
      return this.$store.state.breakpoints
    },
    notificationClicked() {
      return this.$store.state.notificationClicked
    },
  },
  mounted() {
    mountSingleComponent.mounted.call(this)
  },
  render(h) {
    const scoping = { 'data-abr': '' }
    const header = (d, c) => h('header', d, c)
    const h1 = (d, c) => h('h1', d, c)
    const h2 = (d, c) => h('h2', d, c)

    const icon = (d, c) => h('ui-icon', d, c)

    const mdAndUp = /md-/.test(this.breakpoints.lesser)

    return header(
      {
        attrs: {
          ...scoping,
        },
        staticClass: 'root fill-before',
        class: [
          {
            primary: this.$theme.light,
          },
        ],
      },
      [
        icon(
          {
            key: `theme-${this.$theme.is}`,
            props: {
              title: 'notifications',
            },
            attrs: {
              ...scoping,
              clickable: true,
              size: 'lg',
              name: 'bell',
              tag: 'div',
            },
            staticClass: 'notification-icon',
            on: {
              '!click': async () => {
                this.$commit('UPDATE_', {
                  path: 'title',
                  innerPath: 'rootModal.meta',
                  value: 'Notifications',
                })

                await this.$nextTick()

                this.$commit('UPDATE_', {
                  path: 'active',
                  innerPath: 'rootModal',
                  value: true,
                })

                await this.$sleep(600)

                this.$commit('UPDATE_', {
                  path: 'notificationClicked',
                  value: true,
                })
              },
            },
          },
          [
            !this.notificationClicked
              ? h('div', {
                  attrs: { ...scoping },
                  staticClass: 'bell-badge',
                })
              : null,
          ]
        ),

        h2(
          {
            key: this.$store.state.headerText,
            attrs: { ...scoping },
            staticClass: 'title fade-appear line-clamp-1',
          },
          this.$store.state.headerText
        ),

        !mdAndUp
          ? h1(
              {
                staticClass: 'sr-only',
              },
              ['Minna bank']
            )
          : null,
        icon({
          key: `theme-${this.$theme.is}`,
          props: {
            title: 'toggle theme',
          },
          attrs: {
            ...scoping,
            clickable: true,
            size: 'lg',
            name: 'themeLightDark',
          },
          class: [`${this.$theme.is}-theme`],
          staticClass: 'theme-icon fade-appear',
          on: {
            click: () => {
              this.$theme.light = !this.$theme.light
            },
          },
        }),
      ]
    )
  },
}
</script>

<style>
.root[data-abr] {
  height: var(--header-height);
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
}

.dark-theme .root[data-abr] {
  background: var(--theme-banner);
}

.bell-badge[data-abr] {
  --margin-offset: calc(-0.75px - 10px);
  position: absolute;
  width: 5.6px;
  height: 5.6px;
  border-radius: 50%;
  background: var(--warning);
  z-index: 1;
  margin: var(--margin-offset) var(--margin-offset) 0 0;
  border: 1.5px solid var(--border-color, var(--theme-inner-surface));
  box-sizing: content-box;
}

.light-theme .bell-badge[data-abr] {
  --border-color: var(--primary);
}

.title[data-abr] {
  font-weight: 500;
  font-size: 1rem;
  letter-spacing: 0.4px;
  --appear-duration: 150ms;
  color: var(--title-c);
}

.light-theme .title[data-abr] {
  color: var(--title-c-invert);
}

.ui-icon[data-abr] {
  background: var(--theme-surface);
}

.light-theme .ui-icon[data-abr] {
  background: var(--primary);
  color: #fff;
}

.ui-icon[data-abr] > svg {
  --svg-lg-size: 20px;
}

.theme-icon[data-abr].light-theme {
  transform: translateZ(0) rotate(180deg);
}

#ui-root.md-up .root[data-abr] {
  position: absolute;
  right: 0;
  top: 0;
  width: calc(100% - var(--nav-width));
}

.br-xs .root[data-abr],
.br-sm .root[data-abr] {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
}

/* .root[data-abr]::before {
  border-bottom: var(--ui-divide);
} */
</style>
