<script>
import { eventKey, mountSingleComponent } from './utils/main'
export default {
  name: 'UiClickable',
  props: {
    persistent: Boolean,
    tag: {
      type: String,
      default: 'span',
    },
    componentProps: {
      type: Object,
      default: () => ({}),
    },
    nativeOn: Boolean,
    config: {
      type: Object,
      default: () => ({
        self: false,
      }),
    },
  },
  data: () => ({
    active: false,
    currentEvent: '',
    selfName: 'UiClickable',
    willChange: false,
  }),

  computed: {
    ...mountSingleComponent.computed,
  },

  mounted() {
    mountSingleComponent.mounted.call(this)
  },

  // beforeDestroy() {
  //   this.toggleEvents('remove')
  // },

  methods: {
    async update({ active, currentEvent, e, emit }) {
      if (active) {
        this.willChange = true
        await this.$nextTick()
      } else {
        this.willChange = false
      }

      this.active = active
      this.currentEvent = currentEvent

      // emit && this.$emit(this.currentEvent, e)
    },

    triggerSelf(e) {
      // if (this.config.self && e.target?.isSameNode?.(e.currentTarget)) {
      //   e.stopPropagation()
      // }
    },

    // toggleEvents(action) {
    //   ;['click'].forEach((event) =>
    //     this.$el[`${action}EventListener`](event, (e) => console.log(e))
    //   )
    // },
  },
  render(h) {
    const state = this.$store.state

    const touchEvents = {
      '&!touchstart': (e) => {
        this.triggerSelf(e)

        // console.log(e)
        this.update({
          active: true,
          currentEvent: 'touchstart',
          e,
        })
      },
      '&!touchmove': (e) => {
        this.update({
          active: false,
          currentEvent: 'touchmove',
          e,
        })
      },
      '!touchcancel': (e) => {
        this.update({
          active: false,
          currentEvent: 'touchcancel',
          e,
        })
      },
      '!touchend': (e) => {
        this.update({
          active: false,
          currentEvent: 'touchend',
          e,
        })
      },
    }

    const pcEvents = {
      '&!mousedown': (e) => {
        this.triggerSelf(e)

        // console.log(e)
        this.update({
          active: true,
          currentEvent: 'mousedown',
          e,
        })
      },
      '&!mousemove': (e) => {
        this.update({
          active: false,
          currentEvent: 'mousemove',
          e,
        })
      },
      '!mouseup': (e) => {
        this.update({
          active: false,
          currentEvent: 'mouseup',
          e,
        })
      },

      '!keydown': (e) => {
        const key = eventKey(e)

        if (/spacebar|^enter$/i.test(key)) {
          this.triggerSelf(e)

          e.preventDefault()

          this.update({
            active: true,
            currentEvent: 'keydown',
            e,
          })
        }
      },

      '!keyup': (e) => {
        const key = eventKey(e)

        if (/spacebar|^enter$/i.test(key)) {
          e.preventDefault()

          e.currentTarget?.click?.()

          this.update({
            active: false,
            currentEvent: 'keyup',
            e,
          })
        }
      },
    }

    let events = {
      '!blur': (e) => {
        this.update({
          active: false,
          currentEvent: 'blur',
          e,
        })
      },

      '!&click': (e) => {
        this.update({
          active: false,
          currentEvent: 'click',
          e,
          emit: false,
        })
      },
    }

    if (!state.isStrictTouchDevice) {
      events = { ...events, ...pcEvents }
    }

    if (state.isTouchDevice) {
      events = { ...events, ...touchEvents }
    }

    return h(
      this.tag,
      {
        props: { ...this.componentProps },
        attrs: { ...this.$attrs },
        class: [
          {
            Active: this.active,
            'will-change-transform': this.willChange,
          },
        ],
        on: !this.nativeOn
          ? {
              ...this.$listeners,
              ...events,
            }
          : undefined,
        nativeOn: this.nativeOn
          ? {
              ...this.$listeners,
              ...events,
              // click: (e) => console.log(e),
            }
          : undefined,
      },
      this.$slots.default
    )
  },
}
</script>
