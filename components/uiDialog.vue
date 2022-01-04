<script>
/* eslint-disable prefer-const */
/* eslint-disable prefer-const */
// import Vue from 'vue'
import {
  zIndex,
  eventKey as EventKey,
  mountComplexComponent,
  nextAnimFrame,
} from '~/components/utils/main'
export default {
  name: 'UiDialog',
  model: {
    prop: 'vmodel',
    event: 'vmodel',
  },
  props: {
    transitionName: {
      type: String,
      default: 'anim-scale',
    },
    contentKey: {
      type: [String, Number],
      default: undefined,
    },
    restoreScroll: {
      type: Boolean,
      default: true,
    },
    transition: {
      type: [String, Object, Boolean],
      default: undefined,
    },
    backdrop: {
      type: [String, Object, Number, Boolean],
      default: () => true,
    },
    backdropOpacity: {
      type: [String, Number],
      default: undefined,
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
    contentTag: {
      type: String,
      default: 'section',
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
    tag: {
      type: String,
      default: 'article',
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
    label: {
      type: String,
      default: '',
    },
    role: {
      type: String,
      default: 'dialog',
    },
    restoreFocus: {
      type: Boolean,
      default: true,
    },
    isSheet: Boolean,
    reducedBackdropTransition: Boolean,
    contentWrapperData: {
      type: Object,
      default: () => ({}),
    },
    fullscreen: Boolean,
    height: {
      type: [String, Number],
      default: undefined,
    },
    focusContent: {
      type: Boolean,
      default: true,
    },
    selfMethods: {
      type: Object,
      default: () => undefined,
    },
  },
  data() {
    return {
      transitionState: '',
      stored_zIndex: '',
      previousFocus: null,
      manualVModel: null,
      selfName: 'UiDialog',
      renderedComponents: ['UiTransition'],
      scrollTo: {},
      hideRoot: false,
    }
  },
  computed: {
    ...mountComplexComponent.computed,
    hasEntered() {
      return /afterE|^$/i.test(this.transitionState) && this.manualVModel
    },
    hasLeft() {
      return /afterL|^$/i.test(this.transitionState) && !this.vmodel
    },
    v_model() {
      return {
        isActive: this.vmodel,
        open: () => this.$emit('vmodel', true),
        close: () => requestAnimationFrame(() => this.$emit('vmodel', false)),
        toggle: () => this.$emit('vmodel', !this.vmodel),
      }
    },
    has_zIndex() {
      let zIndex = +this.zIndex
      if (!zIndex) {
        zIndex = 0
      }
      return zIndex > -1
    },
    payload() {
      return {
        state: this.transitionState,
        zIndex: `${parseFloat(this.stored_zIndex || 0) || 'auto'}`,
        // content: this.$refs.content,
        ...this.v_model,
        hasEntered: this.hasEntered && this.manualVModel,
        hasLeft: !this.manualVModel && this.hasLeft,
        active: this.manualVModel,
        isActive: this.manualVModel,
      }
    },

    backdropConfig() {
      if (this.backdrop === false) {
        return {}
      }
      let config = {
        background: '#000',
        opacity: '0.4',
      }
      if (this.backdrop === true) {
        return config
      }
      if (/string|number/.test(typeof this.backdrop)) {
        let parse = Math.abs(parseFloat(this.backdrop))
        if (isNaN(parse)) {
          config.background = this.backdrop
        }
        if (isFinite(parse) && parse >= 0 && parse <= 1) {
          config.opacity = parse
        }
        return config
      }
      if (typeof this.backdrop === 'object') {
        if (/string|number/.test(typeof this.backdrop.opacity)) {
          let opacity = Math.abs(parseFloat(this.backdrop.opacity))
          if (isFinite(opacity) && opacity >= 0 && opacity <= 1) {
            config.opacity = `${opacity}`
          }
        }
        if (typeof this.backdrop.background == 'string') {
          config.background = this.backdrop.background
        }
        return config
      }
      return config
    },
    hasBackdrop() {
      return Object.keys(this.backdropConfig).length
    },
    canRenderAdditional() {
      return (
        /afterEnter|leave/i.test(this.transitionState) &&
        !/afterLeave/i.test(this.transitionState)
      )
    },
    showAppend() {
      if (!this.removeAppend) {
        return this.canRenderAdditional
      }
      return true
    },
    showPrepend() {
      if (!this.removePrepend) {
        return this.canRenderAdditional
      }
      return true
    },
  },
  watch: {
    ...mountComplexComponent.watch,
    async 'v_model.isActive'(n) {
      if (n) {
        this.transitionState = 'beforeEnter'
        if (this.restoreFocus) {
          requestAnimationFrame(() => {
            this.previousFocus = document?.activeElement || null
          })
        }
        if (typeof this.zIndex == 'undefined') {
          this.$set(this.$c4, 'overlays', [...this.$c4.overlays, this])
          this.stored_zIndex = zIndex.call(this)
        } else {
          this.stored_zIndex = this.zIndex
        }
        await nextAnimFrame()
        // await this.$nextTick()
        if (this.v_model.isActive) {
          this.manualVModel = true
          await nextAnimFrame()

          // this.scrollTo = {
          //   x: pageXOffset,
          //   y: pageYOffset,
          // }
        }
      } else {
        this.transitionState = 'beforeLeave'
        if (this.restoreScroll && typeof this.scrollTo?.y == 'number') {
          window.scrollTo({ ...this.scrollTo })
          await nextAnimFrame()
          await this.$nextTick()
        } else {
          await nextAnimFrame()
        }
        this.manualVModel = false
      }
    },
    $route(n, o) {
      if (n.path != o.path) {
        this.v_model.close()
      }
    },
  },
  created() {
    this.manualVModel = this.v_model.isActive
    if (this.manualVModel) {
      this.transitionState = 'beforeEnter'
    } else {
      this.transitionState = 'afterLeave'
    }
  },
  mounted() {
    mountComplexComponent.mounted.call(this)
    requestAnimationFrame(() => {
      this.$el._uiAction = this.selfMethods || this.v_model
    })
  },
  // updated() {
  //   if (this.manualVModel) {
  //     this.$el._uiAction = this.selfMethods || this.v_model
  //   }
  // },
  beforeDestroy() {
    this.$set(
      this.$c4,
      'componentZIndex',
      this.$c4.componentZIndex.filter((x) => x._uid != this._uid)
    )
    this.$set(
      this.$c4,
      'overlays',
      this.$c4.overlays.filter((x) => x._uid != this._uid)
    )
    this.v_model.close()
  },
  methods: {
    ...mountComplexComponent.methods,
  },
  render(h) {
    if (!this.$store.getters.pageEntered || !this.$c4.mounted) {
      return null
    }
    const root = (d, c) => h(this.tag, d, c)
    const div = (d, c) => h('div', d, c)
    const transition = (d, c) => h('transition', d, c)
    const span = (d, c) => h('span', d, c)
    const label = this.label.toLowerCase()
    const transitioning = !/afterE|afterL|^$/i.test(this.transitionState)
    const touchstart =
      transitioning && this.hasBackdrop
        ? {
            touchstart: (e) => {
              e.stopPropagation()
              e.preventDefault()
            },
          }
        : {}
    const animCancelled = () => {
      this.hideRoot = true
      this.v_model.close()
      this.$sleep(350).then(() => {
        this.hideRoot = false
      })
    }

    return root(
      {
        attrs: {
          ...this.$attrs,
          id: `${label}-root`
            .replace(/-root{2,2}$/, '-root')
            .replace(/\s+/g, '-'),
          'aria-label': label,
          role: this.role,
          'aria-expanded': this.manualVModel ? 'true' : undefined,
          'aria-hidden': !this.v_model.isActive ? 'true' : undefined,
        },
        staticClass: 'ui-dialog',
        class: [
          `${this.$theme.is}-theme`,
          {
            __active: this.manualVModel,
            __fullscreen: this.fullscreen,
            __transitioning: transitioning,
            __leaving: /^beforeLeave|^leave/i.test(this.transitionState),
            __entering: /^beforeEn|^enter/i.test(this.transitionState),
            'd-none': this.hideRoot,
            'no-backdrop': !this.hasBackdrop,
          },
        ],
        style: {
          zIndex: this.stored_zIndex || undefined,
          // touchAction: this.manualVModel ? 'none' : undefined,
          pointerEvents:
            /beforeLeave|^leave/i.test(this.transitionState) || this.vmodel
              ? 'initial'
              : undefined,
          '--height': this.fullscreen ? this.height : undefined,
          willChange: /^before|^enter|^leave/i.test(this.transitionState)
            ? 'content'
            : undefined,
        },
        on: {
          ...this.$listeners,
          mousedown: (e) => {
            ;/afterE/i.test(this.transitionState) &&
              requestAnimationFrame(() => this.$nextTick(this.v_model.close))
            this.$emit('mousedown', e)
          },
          keyup: (e) => {
            let eventKey = EventKey(e)
            if (/esc/i.test(eventKey)) {
              this.v_model.close()
            }
            this.$emit('keyup', e)
          },
          ...touchstart,
        },
      },
      [
        this.hasBackdrop
          ? div({
              ref: 'backdrop',
              attrs: {
                'aria-label': this.manualVModel ? 'click to close' : undefined,
              },
              staticClass: '__backdrop',
              style: {
                background: this.backdropConfig.background,
                opacity: this.manualVModel
                  ? `${this.backdropOpacity || this.backdropConfig.opacity}`
                  : '0',
                '--transition': this.reducedBackdropTransition
                  ? `0ms`
                  : `${this.vmodel ? '400' : '150'}ms opacity ease ${
                      this.vmodel ? '64ms' : '0ms'
                    }`,
                willChange: /^before|^enter|^leave/i.test(this.transitionState)
                  ? 'opacity'
                  : undefined,
              },
            })
          : null,
        this.canRenderAdditional &&
          span({
            ref: 'focus-trap-1',
            key: 'focus-trap-1',
            attrs: { tabindex: '0', 'aria-hidden': 'true' },
            on: {
              focus: () => {
                this.$refs.content?.focus?.()
              },
            },
          }),
        this.showAppend ? this.$scopedSlots?.prepend?.(this.payload) : null,
        // this.isSheet &&
        //   div({
        //     attrs: { "aria-hidden": "true" },
        //     staticClass: "false-el",
        //   }),
        div(
          {
            ref: 'content-wrapper',
            ...this.contentWrapperData,
            staticClass: `content-wrapper${
              this.contentWrapperData?.staticClass
                ? ` ${this.contentWrapperData.staticClass}`
                : ''
            }`,
          },
          [
            transition(
              {
                key: 'transition-wrapper',
                props: {
                  name: this.transitionName,
                  type: 'animation',
                  // model: this.v_model.isActive,
                },
                on: {
                  beforeEnter: (e) => {
                    this.transitionState = 'beforeEnter'
                    this.$emit('beforeEnter', e)
                  },
                  enter: (e) => {
                    this.transitionState = 'enter'

                    this.$emit('enter', e)
                  },
                  enterCancelled: (e) => {
                    this.transitionState = 'enterCancelled'

                    this.$emit('enterCancelled', e)
                    this.$emit('animCancelled', e)

                    animCancelled()
                  },
                  afterEnter: (e) => {
                    this.transitionState = 'afterEnter'
                    if (!document.activeElement?.closest?.('.ui-dialog')) {
                      this.focusContent && e?.focus?.()
                    }
                    this.$emit('afterEnter', e)
                  },
                  beforeLeave: (e) => {
                    this.transitionState = 'beforeLeave'

                    this.$emit('beforeLeave', e)
                  },
                  leave: (e) => {
                    this.transitionState = 'leave'

                    this.$emit('leave', e)
                    if (
                      !this.$c4.overlays?.filter((x) => x._uid != this._uid)
                        ?.length
                    ) {
                      const html = this.$el.closest('html')
                      requestAnimationFrame(() =>
                        html.classList.add('no-overlay')
                      )
                    }
                    if (this.restoreFocus) {
                      requestAnimationFrame(() => {
                        if (
                          this.previousFocus instanceof HTMLElement &&
                          document.body.contains(this.previousFocus)
                        ) {
                          this.previousFocus.focus()
                        }
                      })
                    }
                  },
                  leaveCancelled: (e) => {
                    this.transitionState = 'leaveCancelled'

                    this.$emit('animCancelled', e)

                    this.$emit('leaveCancelled', e)
                    animCancelled()
                  },
                  afterLeave: (e) => {
                    this.transitionState = 'afterLeave'

                    this.$emit('afterLeave', e)
                    this.$set(
                      this.$c4,
                      'componentZIndex',
                      this.$c4.componentZIndex.filter(
                        (x) => x._uid != this._uid
                      )
                    )
                    this.$set(
                      this.$c4,
                      'overlays',
                      this.$c4.overlays.filter((x) => x._uid != this._uid)
                    )
                    this.$nextTick(() => {
                      this.stored_zIndex = 'auto'
                      this.stored_zIndex = ''
                    })
                  },
                },
              },
              [1].map(() => {
                const content = h(
                  this.contentTag,
                  {
                    ref: 'content',
                    key:
                      typeof this.contentKey == 'undefined'
                        ? 'content'
                        : this.contentKey,
                    attrs: {
                      role: 'document',
                      ...this.contentAttrs,
                      tabindex: this.v_model.isActive ? '0' : '-1',
                    },
                    staticClass: 'ui-dialog-content __content',
                    class: [
                      this.contentClass,
                      {
                        __rounded: this.rounded,
                        'raise-dark': this.raise,
                        transitioning: /before|^ent|^lea/i.test(
                          this.transitionState
                        ),
                        __transitioning: !/afterE|afterL|^$/i.test(
                          this.transitionState
                        ),
                        __leaving: /^beforeLeave|^leave/i.test(
                          this.transitionState
                        ),
                        __entering: /^beforeEn|^enter/i.test(
                          this.transitionState
                        ),
                      },
                      this.background,
                    ],
                    style: this.contentStyle,
                    on: {
                      ...this.contentEvent,
                      mousedown: (e) => {
                        e.stopPropagation()
                        this.$emit('content-mousedown', e)
                      },
                      wheel: (e) => {
                        e.stopPropagation()
                        this.$emit('content-wheel', e)
                      },
                      touchmove: (e) => {
                        e.stopPropagation()
                        this.$emit('content-touchmove', e)
                      },
                    },
                    directives: !this.removeContent
                      ? [
                          {
                            name: 'show',
                            value: this.manualVModel,
                          },
                        ]
                      : undefined,
                  },
                  [this.$scopedSlots?.default?.(this.payload)]
                )
                if (this.removeContent) {
                  return this.manualVModel && content
                } else return content
              })
            ),
          ]
        ),
        this.showPrepend ? this.$scopedSlots?.append?.(this.payload) : null,
        this.canRenderAdditional &&
          span({
            ref: 'focus-trap-2',
            key: 'focus-trap-2',
            attrs: { tabindex: '0', 'aria-hidden': 'true' },
            on: {
              focus: () => {
                this.$refs.content?.focus?.()
              },
            },
          }),
      ]
      // : []
    )
  },
}
</script>
<style>
.ui-dialog {
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  isolation: isolate;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  z-index: -1000;
  -ms-scroll-chaining: none;
  overscroll-behavior: contain;
  outline: none !important;
}
.ui-dialog.__transitioning:not(.no-backdrop) {
  /* pointer-events: none !important; */
  touch-action: none !important;
}
.ui-dialog.__fullscreen .ui-dialog-content {
  height: var(--height, var(--full-dialog));
}
.ui-dialog .ui-dialog-content.__default-background {
  background-color: var(--theme-primary);
}
.ui-dialog.__active {
  pointer-events: auto;
}
.ui-dialog > .__backdrop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: var(--transition);
}
.ui-dialog > .content-wrapper {
  height: 100%;
  width: 100%;
  display: grid;
  align-items: center;
  justify-items: center;
  place-items: center;
  position: relative;
  max-width: var(--max-width);
  margin: 0 auto;
}
.ui-dialog > .content-wrapper:before {
  width: 64px;
  height: 6px;
  border-radius: var(--pill);
  background-color: currentColor;
  transition: opacity 0.25s ease;
  left: 50%;
  transform: -50%;
  opacity: 0;
}
.ui-dialog .ui-dialog-content {
  z-index: 1;
  overflow: hidden;
  isolation: isolate;
  min-height: 2rem;
  max-height: 100vh;
  min-width: 2rem;
  max-width: 100%;
  outline: none;
  position: relative;
}
/* .ui-dialog .ui-dialog-content.transitioning.hide-transitioning-content > * {
  opacity: 0 !important;
} */
/* .ui-dialog.__entering .ui-dialog-content.transitioning > * {
  /* opacity: 0 !important; */
/* visibility: hidden !important;
} */

.ui-dialog.__entering .ui-dialog-content.transitioning > * {
  opacity: 0 !important;
  visibility: hidden !important;
}

.ui-dialog-content:not(.transitioning) > * {
  animation: fade-appear 100ms linear;
}

*/ .ui-dialog .ui-dialog-content.__rounded {
  border-radius: 8px;
}
</style>
