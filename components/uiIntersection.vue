<script>
import { mountSingleComponent, nextAnimFrame } from '~/components/utils/main'
const defaultConfig = {
  threshold: '0',
  rootMargin: '0px 0px 0px 0px',
  root: null,
}

export default {
  name: 'UiIntersection',
  props: {
    // tag: String,
    once: Boolean,
    config: {
      type: Object,
      default: () => defaultConfig,
    },
    useAnimationFrame: {
      type: Boolean,
      default: true,
    },
    disableIntersection: Boolean,
    singleAnimationFrame: Boolean,
    sleep: {
      type: [String, Number],
      default: 1,
    },
    // keepAlive: Boolean,
  },
  data() {
    return {
      selfName: 'UiIntersection',
      isMounted: false,

      isIntersecting: false,
      // target: null,
      entries: {
        inactive: true,
      },

      Observer: {
        class: null,
        callback: (entry) => {
          entry.forEach(async (entries) => {
            const setPayload = () => {
              this.entries = entries
              this.isIntersecting = entries.isIntersecting
              // this.target = entries.target;
            }
            const callback = () => {
              if (this.once) {
                if (!this.Observer.class) {
                  return
                }

                setPayload()

                if (this.isIntersecting) {
                  this.$emit('once-intersected', entries)
                  this.Observer.class?.unobserve(this.$el)
                  this.Observer.class?.disconnect?.()
                  this.Observer.class = null
                }

                return
              }

              setPayload()
            }

            if (!this.useAnimationFrame) {
              return callback()
            }
            if (this.singleAnimationFrame) {
              await nextAnimFrame()
              return callback()
            }
            await nextAnimFrame()
            // await nextAnimFrame()
            callback()
            // requestAnimationFrame(() => requestAnimationFrame(callback))
          })
        },
      },
    }
  },
  computed: {
    payload() {
      return {
        isIntersecting: this.isIntersecting,
        // target: this.target,
        entries: {
          boundingClientRect: this.entries.boundingClientRect,
          intersectionRatio: this.entries.intersectionRatio,
          intersectionRect: this.entries.intersectionRect,
          isIntersecting: this.entries.isIntersecting,
          isVisible: this.entries.isVisible,
          rootBounds: this.entries.rootBounds,
          // target: this.entries.target,
          time: this.entries.time,
        },
        // entries: this.entries,
      }
    },

    ...mountSingleComponent.computed,
  },

  watch: {
    '$store.state.breakpoints.is'() {
      this.refresh()
    },
    '$store.state.barsHeight.appBar'() {
      this.refresh()
    },
    '$store.state.barsHeight.navBar'() {
      this.refresh()
    },
    disableIntersection(n) {
      this.refresh()
    },
  },

  beforeMount() {
    this.isMounted = true

    this.observe()
  },
  mounted() {
    mountSingleComponent.mounted.call(this)
  },
  activated() {
    this.observe()
  },
  beforeDestroy() {
    this.isMounted = false

    this.disconnect()
  },
  deactivated() {
    this.isMounted = false

    this.disconnect()
  },
  methods: {
    connect() {
      if (this.Observer.class || this.disableIntersection || !this.isMounted) {
        return
      }

      let initialOptions = {
        ...defaultConfig,
        ...this.config,
      }

      let options = {
        ...initialOptions,
        threshold: /string|number/i.test(typeof initialOptions.threshold)
          ? parseFloat(initialOptions.threshold)
          : initialOptions.threshold,
      }

      initialOptions = 0

      requestAnimationFrame(() => {
        if (!this.disableIntersection) {
          this.$nextTick(() => {
            this.Observer.class = new IntersectionObserver(
              this.Observer.callback,
              options
            )

            this.$nextTick(() => {
              this.Observer.class.observe(this.$el)

              options = 0
            })
          })
        }
      })
    },
    observe() {
      this.entries = {}
      this.$nextTick(async () => {
        await this.$sleep(this.sleep, true)
        this.connect()
      })
    },
    disconnect() {
      this.Observer.class?.unobserve(this.$el)
      this.Observer.class?.disconnect()

      this.$nextTick(() => {
        this.Observer.class = null
        this.target = null

        this.entries = { inactive: true }
      })
    },
    refresh() {
      this.disconnect()
      this.$nextTick(this.connect)
    },
  },
  render() {
    const el = this.$scopedSlots?.default?.(this.payload)
    return el
  },
}
</script>
