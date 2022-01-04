<script>
export default {
  name: 'RootModal',
  data: () => ({
    manualVModel: false,
    transitionState: '',
    mapComponents: {},
  }),
  computed: {
    vmodel() {
      const toggle = async (value = false, meta) => {
        meta &&
          this.$commit('UPDATE_', {
            path: 'meta',
            innerPath: 'rootModal',
            value: meta,
          })

        if (typeof value == 'string') {
          await this.$nextTick()

          this.$router[meta?.action || 'push']({
            query: {
              rootModal: value,
            },
          })
        } else if (value === false && this.modalRoute) {
          await this.$nextTick()

          this.$router[meta?.action || 'push']({
            query: {
              rootModal: undefined,
            },
          })
        } else if (typeof value == 'boolean') {
          await this.$nextTick()

          this.$commit('UPDATE_', {
            path: 'active',
            innerPath: 'rootModal',
            value,
          })
        }
      }
      return {
        active: this.manualVModel,
        open: () => toggle(true),
        close: () => toggle(false),
        toggle,
      }
    },

    data() {
      return this.$store.state.rootModal
    },

    meta() {
      return this.data?.meta || {}
    },

    modalRoute() {
      return !!this.$route.query.rootModal
    },

    storeState() {
      return this.data.active
    },

    activeComponent() {
      return this.meta.component
    },

    activeComponentLoaded() {
      return this.$loadedComponent(this.mapComponents[this.activeComponent])
    },
  },

  watch: {
    storeState() {
      this.manualVModel = this.storeState
    },
    modalRoute() {
      this.manualVModel = this.modalRoute
    },
    transitionState(n) {
      this.$commit('UPDATE_', {
        path: 'transitionState',
        innerPath: 'rootModal',
        value: n,
      })
    },
    $route(n, o) {
      if (o.path != n.path) {
        this.vmodel.close()
      }
    },
  },

  async created() {
    if (this.modalRoute) {
      await this.$sleep(150)

      this.manualVModel = this.modalRoute
    } else this.manualVModel = this.storeState
  },

  render(h) {
    const blankPage = (d, c) => h('blankPage', d, c)
    const header = (d) => h('sheetHeader', d)

    // const component = (p) => ({})

    return h(this.data.tag, {
      key: this.meta.uid,
      attrs: {
        ...(this.meta?.attrs || {}),
        // id: 'modal-root',
      },
      staticClass: 'root-modal',
      class: [
        this.meta?.class || [],
        {
          'hidden-content': !this.activeComponentLoaded,
        },
      ],
      props: {
        vmodel: this.vmodel.active,
        selfMethods: this.vmodel,
        label: this.meta.component,
        ...(this.meta?.props || {}),
      },
      on: {
        animCancelled: () => this.vmodel.close(),
        vmodel: (e) => {
          if (e) {
            this.vmodel.open()
          } else this.vmodel.close()
        },
      },
      scopedSlots: {
        default: (p) => {
          this.transitionState = p.state

          // const content = component(p)?.[this.activeComponent]?.() || null

          return [
            header({
              props: {
                title: this.$store.state.rootModal.meta.title,
              },
              on: {
                'close-clicked': this.vmodel.close,
              },
            }),
            blankPage(),
          ]
        },
        // append: (p) => {
        //   const loader =
        //     !this.activeComponentLoaded && p.active
        //       ? div(
        //           {
        //             attrs: { 'aria-label': 'loading...', title: 'loading' },
        //             staticClass: 'root-modal__loading fade-appear',
        //           },
        //           [
        //             div({
        //               attrs: { 'aria-hidden': 'true' },
        //               staticClass: 'spinner-border',
        //             }),
        //           ]
        //         )
        //       : null

        //   return [loader]
        // },
      },
    })
  },
}
</script>

<style>
.root-modal .__content {
  height: var(--full-dialog);
  max-height: calc(100% - 1rem);
}

.root-modal .root[data-blcp] {
  max-height: calc(100% - var(--sheet-header-height));
  overflow: hidden auto;
}

.root-modal.hiden-content .__content {
  visibility: hidden !important;
}

.root-modal__loading {
  position: fixed;
  z-index: inherit;
  color: #fff;
  background: rgb(0, 0, 0, 0.7);
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  --appear-duration: 200ms;
}
</style>
