<script>
import { mountComplexComponent, nextAnimFrame } from './utils/main'
// import { timeout } from "./utils";
export default {
  name: 'UiSheet',
  model: {
    prop: 'vmodel',
    event: 'vmodel',
  },

  props: {
    transitionName: {
      type: String,
      default: 'anim-slide-y',
    },
    transition: {
      type: [String, Object, Boolean],
      default: () => undefined,
    },
    backdrop: {
      type: [String, Object, Number, Boolean],
      default: () => 0.75,
    },
    vmodel: {
      type: Boolean,
      default: false,
    },
    zIndex: {
      type: [String, Number],
      default: '',
    },
    removeContent: {
      type: Boolean,
      default: true,
    },
    removeAppend: {
      type: Boolean,
      default: true,
    },
    removePrepend: {
      type: Boolean,
      default: true,
    },
    contentAttrs: {
      type: Object,
      default: () => ({}),
    },
    contentStyle: {
      type: [Object, String],
      default: () => ({}),
    },
    contentClass: {
      type: [Object, Array, String],
      default: () => [],
    },
    contentEvent: {
      type: Object,
      default: () => ({}),
    },
    raise: {
      type: Boolean,
      default: true,
    },
    rounded: {
      type: Boolean,
      default: true,
    },
    background: {
      type: String,
      default: '__default-background',
    },
    // renderBackgroundElem: {
    //   type: Boolean,
    //   default: true,
    // },
    useIntersection: {
      type: Boolean,
      default: true,
    },
    contentTag: {
      type: String,
      default: 'div',
    },
    fullscreen: Boolean,
    height: {
      type: [String, Number],
      default: undefined,
    },
    selfMethods: {
      type: Object,
      default: () => undefined,
    },
    label: {
      type: String,
      default: '',
    },
    contentKey: {
      type: [String, Number],
      default: undefined,
    },
  },
  data() {
    return {
      transitionState: '',
      canSnap: false,
      intersectionState: {
        entries: {},
      },
      addWillChange: false,
      initialBackdropOpacity: undefined,
      backdropOpacity: undefined,
      reducedBackdropTransition: false,
      // backgroundElemHeight: undefined,
      // showBackgroundElem: false,
      noTransition: false,
      selfName: 'UiSheet',
      renderedComponents: ['UiDialog'],
    }
  },
  computed: {
    ...mountComplexComponent.computed,
    getBackdropOpacity() {
      return this.$refs.root?.backdropConfig?.opacity || undefined
    },
    // intersectionHeight() {
    //   const height =
    //     this.intersectionState.entries?.boundingClientRect?.height || undefined
    //   return height ? Math.floor(height) : undefined
    // },
    v_model() {
      return {
        isActive: this.vmodel,
        open: () => this.$emit('vmodel', true),
        close: () => requestAnimationFrame(() => this.$emit('vmodel', false)),
        toggle: () => this.$emit('vmodel', !this.vmodel),
      }
    },
    mdAndUp() {
      return /md-/.test(this.$store.state.breakpoints.lesser)
    },
  },
  watch: {
    ...mountComplexComponent.watch,
    backdrop() {
      this.initialBackdropOpacity = parseFloat(this.getBackdropOpacity)
    },
    // intersectionHeight() {
    //   if (this.intersectionHeight) {
    //     this.backgroundElemHeight = `${this.intersectionHeight * 0.65}px`
    //   } else this.backgroundElemHeight = undefined
    // },
    transitionState() {
      const afterEnter = /afterE/i.test(this.transitionState)
      if (afterEnter) {
        this.reducedBackdropTransition = true
      }
      // this.showBackgroundElem = afterEnter
    },
    async vmodel(n) {
      this.reducedBackdropTransition = false
      this.addWillChange = false
      if (n) {
        this.noTransition = false

        await nextAnimFrame()

        this.$el.scrollTo(0, this.$el.clientHeight)

        await nextAnimFrame()

        this.manualVModel = true
      } else {
        this.manualVModel = false
      }

      // else {
      //   this.backgroundElemHeight = undefined
      //   this.showBackgroundElem = false
      // }
    },
    intersectionState() {
      if (this.manualVModel) {
        let ratio = this.intersectionState?.entries?.intersectionRatio
        if (isNaN(ratio)) {
          ratio = 1
        }
        // const entriesTop =
        //   this.intersectionState?.entries?.boundingClientRect?.top || 1
        // this.showBackgroundElem = ratio >= 0.8 || entriesTop < 1
        requestAnimationFrame(() => {
          // let ratio = this.intersectionState?.entries?.intersectionRatio
          if (isNaN(ratio)) {
            ratio = 1
          }
          if (/afterEnter|leave/i.test(this.transitionState)) {
            if (/afterEnter/i.test(this.transitionState)) {
              this.addWillChange = ratio <= 0.995
            }
            this.backdropOpacity = this.initialBackdropOpacity * ratio
            if (this.initialBackdropOpacity - this.backdropOpacity < 0.01) {
              this.backdropOpacity = this.initialBackdropOpacity
            }
            if (ratio <= 0.05) {
              this.noTransition = true
              this.$emit('scrolled-out', this.intersectionState)
              this.$nextTick(this.v_model.close)
            }
          }
        })
      }
    },
  },
  created() {
    if (this.useIntersection) {
      this.renderedComponents.push('UiIntersection')
    }
  },
  mounted() {
    mountComplexComponent.mounted.call(this)
  },
  methods: {
    ...mountComplexComponent.methods,
    getPayload(p) {
      return {
        ...(p || {}),
        ratio: this.backdropOpacity,
      }
    },
  },
  render(h) {
    const dialog = (d, c) => h('ui-dialog', d, c)
    const intersection = (d, c) => h('ui-intersection', d, c)
    const div = (d, c) => h('div', d, c)

    const mdAndUp = this.mdAndUp

    return dialog({
      ref: 'root',
      props: {
        contentKey: this.contentKey,
        selfMethods: this.selfMethods,
        vmodel: this.vmodel,
        transitionName:
          /leave/i.test(this.transitionState) && this.noTransition
            ? 'pseudo-anim'
            : mdAndUp
            ? 'anim-scale'
            : this.transitionName,
        backdrop: this.backdrop,
        zIndex: this.zIndex,
        removeContent: this.removeContent,
        contentAttrs: this.contentAttrs,
        contentStyle: this.contentStyle,
        contentClass: [
          '__sheet-content fill-after',
          // {
          //   __detachable: !this.fullscreen,
          // },
          this.contentClass || [],
        ],
        contentEvent: this.contentEvent,
        raise: this.raise,
        rounded: this.rounded,
        background: this.background,
        isSheet: !mdAndUp,
        backdropOpacity: /afterEnter|leave/i.test(this.transitionState)
          ? `${this.backdropOpacity}`
          : undefined,
        reducedBackdropTransition: this.reducedBackdropTransition,
        contentTag: this.contentTag,
        fullscreen: this.fullscreen,
        height: this.height,
        label: this.label,
      },
      on: {
        ...this.$listeners,
        vmodel: (e) => {
          this.$emit('vmodel', e)
        },
        beforeEnter: (e) => {
          this.$emit('beforeEnter', e)
          this.backdropOpacity = parseFloat(
            this.$refs.root.backdropConfig.opacity
          )
          this.initialBackdropOpacity = this.backdropOpacity
        },
        afterEnter: (e) => {
          this.$emit('afterEnter', e)
          requestAnimationFrame(() => {
            if (!this.backgroundElemHeight) {
              this.backgroundElemHeight = `${e.clientHeight * 0.65}px`
            }
          })
        },
      },
      staticClass: 'hide-scrollbar',
      class: [
        {
          'ui-sheet': !mdAndUp,
          // 'show-background-elem':
          //   this.showBackgroundElem && this.renderBackgroundElem,
          'will-change': this.addWillChange,
          entered: /afterE/i.test(this.transitionState),
        },
      ],
      // style: {
      //   '--background-elem-height': this.backgroundElemHeight,
      // },
      scopedSlots: {
        prepend: (payload) =>
          this.$scopedSlots?.prepend?.(this.getPayload(payload)),
        default: (payload) => {
          this.transitionState = payload.state
          const thresholdLength = 200
          return [
            this.useIntersection &&
              !mdAndUp &&
              intersection({
                props: {
                  useAnimationFrame: false,
                  disableIntersection: !/afterE|^leave|beforeL/i.test(
                    this.transitionState
                  ),
                  config: {
                    root: this.$el,
                    threshold: [
                      ...Array.from(
                        { length: thresholdLength },
                        (_, i) => i * (1 / thresholdLength)
                      ),
                      1,
                    ],
                  },
                },
                scopedSlots: {
                  default: (intersectionPayload) => {
                    this.intersectionState = intersectionPayload
                    this.$emit('intersection-point', intersectionPayload)
                    return div({
                      attrs: { 'aria-hidden': 'true' },
                      staticClass: 'observer-el fill-before',
                    })
                  },
                },
              }),
            this.$scopedSlots?.default?.(this.getPayload(payload)),
          ]
        },
        append: (payload) =>
          this.$scopedSlots?.append?.(this.getPayload(payload)),
      },
    })
  },
}
</script>
<style>
.ui-sheet.ui-dialog {
  align-items: flex-end;
  display: grid;
  grid-template-rows: 100% 100%;
  overflow-x: hidden;
  overflow-y: auto;
  overflow: hidden auto;
  justify-content: stretch;
  -ms-scroll-snap-type: y mandatory;
  scroll-snap-type: y mandatory;
  --background-elem-background: var(--theme-primary);
  --radius: 0px;
  /* --offset: 0.5rem; */
  --offset: 0;
}
.ui-sheet.ui-dialog.will-change {
  will-change: scroll-position;
}
.ui-sheet.ui-dialog > .content-wrapper {
  display: flex;
  align-items: flex-end;
  scroll-snap-align: start;
  z-index: 1;
  -webkit-overflow-scrolling: touch;
  -ms-scroll-chaining: none;
  overscroll-behavior: contain;
}

#ui-root.md-up .ui-sheet.ui-dialog > .content-wrapper {
  display: grid;
}

#ui-root.md-up .__sheet-content {
  max-width: min(calc(100% - 3rem), 1700px);
  border-radius: var(--rounded) !important;
  place-self: center;
  /* resize: both;
  min-height: min(60vh, 1150px);
  min-width: min(60vw, 1300px);
  max-height: calc(100vh - 1.5rem); */
}

.ui-sheet.ui-dialog:before {
  content: '';
  height: 100%;
  width: 100%;
  display: block;
  scroll-snap-align: end;
}

#ui-root.md-up .ui-sheet.ui-dialog {
  overflow: hidden;
}

@supports (-webkit-overflow-scrolling: touch) {
  .ui-sheet.ui-dialog:after {
    position: fixed;
    bottom: 0;
    left: 0;
    height: var(--background-elem-height);
    width: 100%;
    display: block;
    content: '';
    background-color: var(--background-elem-background);
    opacity: 0;
  }
  .ui-sheet.ui-dialog.show-background-elem:after {
    opacity: 1;
  }
}
.ui-sheet.ui-dialog > .__backdrop {
  position: fixed;
}
.ui-sheet.ui-dialog.will-change > .__backdrop {
  will-change: opacity;
}
.__sheet-content {
  width: 100%;
  /* width: calc(100% - calc(var(--offset) * 2)); */
  border-radius: 1rem 1rem 0 0 !important;
  -webkit-overflow-scrolling: touch;
  left: var(--offset);
  bottom: var(--offset);
  --scroll-bar-size: 4px;
}
/* .__sheet-content::after {
  border: var(--ui-divide);
  opacity: var(--t-disabled);
} */
.ui-sheet.ui-dialog .__content > .observer-el {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  background-color: transparent;
  border-radius: inherit;
}
/* .ui-sheet.ui-dialog .__content > .observer-el:before {
  height: 5%;
  border-top: var(--ui-divide);
  transition: opacity 0.2s;
  opacity: 0;
} 
.ui-sheet.ui-dialog.will-change .__content > .observer-el:before {
  opacity: var(--t-disabled);
} */
</style>
