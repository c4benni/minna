/* eslint-disable promise/param-names */
/* eslint-disable camelcase */
/* eslint-disable valid-typeof */
/* eslint-disable no-new-func */

export const distinctArray = (val, arr, reverse) =>
  reverse ? [...new Set([val, ...arr])] : [...new Set([...arr, val])]

export function shopSectionComputed(name) {
  return {
    state() {
      return this.$store.state.shopSections[name]
    },
    supabase() {
      return this.$store.getters.supabase
    }
  }
}

export const closestDialog = (e) =>
  e?.currentTarget?.closest?.('.ui-dialog')?._uiAction || {}

export function breakpointsClasses() {
  const breakpoints = this.$store.state.breakpoints
  if (!breakpoints?.is) {
    return ''
  }
  const acceptable = (breakpoints.lesser || 'xs').split('-')

  let acceptableBR = ''

  acceptable.forEach((x, i) => (acceptableBR += `${i ? ' ' : ''}abr-${x}`))

  const miniDevice = /xs|sm/.test(breakpoints.is) ? 'mini-device' : ''

  return breakpoints.is
    ? `br-${breakpoints.is} or-${breakpoints.orientationAlias}${
        breakpoints.greater ? ` gt-${breakpoints.greater}` : ''
      }${
        breakpoints.lesser ? ` ls-${breakpoints.lesser}` : ''
      } ${acceptableBR} ${miniDevice} ${
        /md-/.test(breakpoints.lesser)
          ? 'md-up'
          : /sm-/.test(breakpoints.lesser)
          ? 'sm-down'
          : ''
      } ${
        /lg-/.test(breakpoints.lesser)
          ? 'lg-up'
          : /md-/.test(breakpoints.lesser)
          ? 'md-down'
          : ''
      } ${/sm-/.test(breakpoints.lesser) ? 'sm-up' : 'xs-down'}`.replace(
        /\s{2,}/g,
        ' '
      )
    : ''
}

export const functionalEmit = ({ event, payload, c }) =>
  c?.data?.on?.[event]?.(payload)

export const mountComponents = {
  computed: {
    selfRendered() {
      return this.$loadedComponent(this.selfName)
    }
  }
}

export const mountComplexComponent = {
  computed: {
    ...mountComponents.computed,

    childrenRendered() {
      if (this.selfRendered) {
        return true
      }

      const rendered = this.renderedComponents.filter((x) => {
        return !!this.$store.state.fetched.components?.[x]
      })

      return rendered.length == this.renderedComponents.length
    }
  },
  methods: {
    async mountSelf() {
      if (this.selfRendered) {
        return true
      }

      if (!this.selfRendered) {
        await this.$sleep(200)
      }

      if (this.childrenRendered && !this.selfRendered) {
        const value = { ...this.$store.state.fetched.components }

        value[this.selfName] = true

        this.$commit('UPDATE_', {
          path: 'components',
          innerPath: 'fetched',
          value
        })
      }
    }
  },
  mounted() {
    this.mountSelf()
  },
  watch: {
    childrenRendered(n) {
      if (n) {
        this.mountSelf()
      }
    }
  }
}

export const mountPages = {
  computed: {
    selfRendered() {
      // const findComponents = (str) =>
      //   this.$store.state.fetched.components[str]

      return (
        // findComponents('AppHeader') &&
        // (!/shop\/add_to_bag/i.test(this.$route.path)
        //   ? findComponents('AppFooter')
        //   : true) &&
        this.$store.state.fetched.pages[this.selfName]
      )
    }
  }
}

export const mountComplexPage = {
  computed: {
    ...mountPages.computed,

    childrenRendered() {
      if (this.selfRendered) {
        return true
      }

      const rendered = this.renderedComponents.filter((x) => {
        return !!this.$store.state.fetched.components?.[x]
      })

      return rendered.length == this.renderedComponents.length
    }
  },
  methods: {
    async mountSelf() {
      if (this.selfRendered) {
        return true
      }

      if (!this.selfRendered) {
        await this.$sleep(200)
      }

      if (this.childrenRendered) {
        if (!this.selfRendered) {
          const value = { ...this.$store.state.fetched.pages }

          value[this.selfName] = true
          value[this.$route.name] = true

          this.$commit('UPDATE_', {
            path: 'pages',
            innerPath: 'fetched',
            value
          })
        }

        this.$commit('UPDATE_', {
          path: 'showPageLoading',
          value: false
        })

        this.$commit('V_MODEL', {
          path: 'loadingBar',
          value: false
        })
      }
    }
  },
  mounted() {
    this.mountSelf()
  },
  watch: {
    childrenRendered(n) {
      if (n) {
        this.mountSelf()
      }
    }
  }
}

export function logoSVG({ h, size }) {
  return h(
    'svg',
    {
      attrs: {
        alt: 'app icon',
        height: size,
        width: size,
        viewBox: `0 0 48 48`
      },
      staticClass: 'logo-loader'
    },
    [
      {
        fill: '#8097a2',
        d: 'M20.466,4.464L15.18,9.75l8.833,8.838l8.818-8.828l-5.296-5.296C26.558,3.488,25.279,3,24,3 C22.721,3,21.442,3.488,20.466,4.464z'
      },
      {
        fill: '#37474f',
        d: 'M15.18,9.75L4.464,20.466C3.488,21.442,3,22.721,3,24c0,1.279,0.488,2.558,1.464,3.534l5.309,5.309 l14.24-14.255L15.18,9.75z'
      },
      {
        fill: '#1565c0',
        d: 'M41.569 18.499L32.831 9.76 24.013 18.588 32.687 27.269z'
      },
      {
        fill: '#90caf9',
        d: 'M43.536,20.466l-1.967-1.967l-8.882,8.77l5.555,5.559l5.293-5.293 c0.968-0.968,1.456-2.234,1.464-3.503C45.008,22.742,44.52,21.45,43.536,20.466z'
      },
      {
        fill: '#03a9f4',
        d: 'M9.773,32.843l10.693,10.693C21.442,44.512,22.721,45,24,45c1.279,0,2.558-0.488,3.534-1.464 l10.708-10.708l-14.23-14.24L9.773,32.843z'
      }
    ].map((item, key) => {
      return h('path', {
        key,
        attrs: {
          fill: item.fill,
          d: item.d
        }
      })
    })
  )
}

export const mountSingleComponent = {
  computed: {
    ...mountComponents.computed
  },
  async mounted() {
    if (!this.selfRendered) {
      await this.$sleep(200)

      const value = { ...this.$store.state.fetched.components }

      value[this.selfName] = true

      this.$commit('UPDATE_', {
        path: 'components',
        innerPath: 'fetched',
        value
      })
    }
  }
}

export const promiser = (val = true) => {
  return new Promise((r) => r(val))
}

export const mediaListener = ({ media, callback }) => {
  try {
    media.addEventListener('change', callback)
  } catch (e) {
    if (/undefined is not a function/i.test(e.message)) {
      media?.addListener?.(callback)
    }
  }
}

export function setTouchDevice() {
  const touchDevice =
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0

  this.$commit('UPDATE_', {
    path: 'isTouchDevice',
    value: touchDevice
  })

  if (!setTouchDevice.mediaSet) {
    const strictTouch = (value) =>
      this.$commit('UPDATE_', {
        path: 'isStrictTouchDevice',
        value
      })

    const media = window.matchMedia('(pointer: coarse)')

    strictTouch(media.matches)

    setTouchDevice.mediaSet = true

    mediaListener({
      media,
      callback: (e) => {
        strictTouch(e.matches)
      }
    })
  }
}

export function Copy({ text, onSuccess = () => {}, onError = () => {} }) {
  return new Promise((r) => {
    const oldBrowser = () => {
      try {
        let psuedoInput = document.createElement('input')
        psuedoInput.classList.add('sr-only')
        psuedoInput.setAttribute('tabindex', '-1')
        psuedoInput.setAttribute('aria-hidden', 'true')
        psuedoInput.value = text
        document.body.appendChild(psuedoInput)
        psuedoInput.select()

        document.execCommand('copy')
        document.body.removeChild(psuedoInput)
        onSuccess()
        psuedoInput = 0
      } catch (e) {
        if (e) {
          onError()
        }
      } finally {
        r()
      }
    }

    if ('clipboard' in navigator) {
      try {
        navigator.clipboard.writeText(text)
        onSuccess()
        r()
      } catch (e) {
        if (e) {
          oldBrowser()
        }
      }
    } else oldBrowser()
  })
}

export function getType(x) {
  const $type = typeof x
  const isArray = (val) => Array.isArray(val)

  if (isArray(x)) {
    return 'array'
  }
  if ($type == 'object' && !isArray(x)) {
    return 'object'
  }
  return $type
}

export const isHTML = (x) => x instanceof HTMLElement

export function kebabCase(val) {
  if (typeof val === 'string') {
    return val
      .replace(/[A-Z]/g, (x) => `-${x.toLowerCase()}`)
      .replace(/-+/g, '-')
      .replace(/^-*/, '')
  }
  return val
}

function animationFrame(action) {
  if (!process.client) {
    return function () {}
  }
  const aF = 'AnimationFrame'

  if (action == 'request') {
    return (
      window[`${action}${aF}`] ||
      window[`webkitRequest${aF}`] ||
      window[`mozRequest${aF}`] ||
      window[`msRequest${aF}`]
    )
  }
  return (
    window[`${action}${aF}`] ||
    window[`webkitCancel${aF}`] ||
    window[`mozCancel${aF}`] ||
    window[`msCancel${aF}`]
  )
}

export class Debounce {
  constructor({ callback = () => {}, delay = 0, before = () => {} }) {
    this.callback = callback
    this.delay = delay
    this.timeout = null
    this.before = before
    this.running = false
  }

  get Delay() {
    if (typeof this.delay === 'function') {
      return this.delay()
    }
    return this.delay
  }

  init() {
    this.running = true
    this.before()
    this.timeout && window.clearTimeout(this.timeout)
    this.timeout = window.setTimeout(() => {
      this.running = false
      this.callback()
      window.clearTimeout(this.timeout)
      this.kill()
    }, this.Delay)
  }

  kill() {
    this.timeout = null
  }
}

export const rAF = animationFrame('request')
export const cAF = animationFrame('cancel')

export const nextFrame = () => {
  return new Promise((r) =>
    timeout({
      callback: r,
      delay: 16
    })
  )
}

export const nextAnimFrame = (callback) => {
  return new Promise((r) =>
    requestAnimationFrame(() => {
      r()
      callback?.()
    })
  )
}

export function timeout({
  callback = () => {},
  delay = 0,
  cancel = () => false,
  timeStamp,
  data = () => ({})
}) {
  // const $ = this?.$nextTick ? this : app;

  if (!timeout.worker) {
    timeout.worker = new Worker('workers/tw.js')
  }

  const worker = timeout.worker

  // let manualWorker = false

  const $data = data()

  const ts = timeStamp || performance.now()

  const evtCallback = (e) => {
    if (e.data.name == 'timeout') {
      if (e.data.timeStamp == ts) {
        // await nextFrame();
        !cancel($data) && callback($data)

        worker.removeEventListener('message', evtCallback, { passive: true })

        // if (manualWorker) {
        //   worker.terminate()
        // }
      }
    }
  }

  worker.addEventListener('message', evtCallback, {
    passive: true
  })

  worker.postMessage({
    name: 'timeout',
    timeStamp: ts,
    data: $data,
    delay
  })
}

export function sleep(d, idle, cb) {
  if (!process.client) {
    return new Promise((r) => r())
  }

  const D = convertSeconds(d)

  const idleCallback = (fn) =>
    (window.requestIdleCallback || window.setTimeout)(fn)
  const cancel_idleCallback = (id) =>
    (window.cancelIdleCallback || window.clearTimeout)(id)
  return new Promise((r) => {
    if (typeof D === 'number') {
      // this.$nextTick(() => {
      timeout.call(this, {
        callback: () => {
          if (!idle) {
            r()
            return cb?.() || true
          }
          const t = idleCallback(() => {
            r()
            cb?.()
            requestAnimationFrame(() => cancel_idleCallback(t))
          })
        },
        delay: D
      })
      // });
    }
    // this.$nextTick(() =>
    else
      requestAnimationFrame(() => {
        if (!idle) {
          r()
          return cb?.() || true
        }

        const t = idleCallback(() => {
          r()
          cb?.()
          requestAnimationFrame(() => cancel_idleCallback(t))
        })
      })
    // );
  })
}

export function zIndex() {
  this.$c4.componentZIndex.push(this)
  this.$c4.componentZIndex = [...new Set(this.$c4.componentZIndex)]

  const lengthTimes100 = 100 * this.$c4.componentZIndex.length

  return 10000 + this.$c4.componentZIndex.length + lengthTimes100
}

export function parser({ input, type, bind = null }) {
  const $ = new Function(
    `try{return ${input}}catch(e){if(e)throw new Error('invalid input')}`
  )
  const hasType = type && typeof type === 'string' && type.length
  const output = $.call(bind)
  const returnValue = !hasType
    ? output
    : type == 'array'
    ? Array.isArray(output)
      ? output
      : undefined
    : type == 'object'
    ? !Array.isArray(output) && typeof output === 'object'
      ? output
      : undefined
    : typeof output === type
    ? output
    : undefined
  return returnValue
}

export function getObjectPath({ obj, path }) {
  if (!path) {
    path = ''
  }
  let hit_undefined = false
  let output = obj
  const arr = path.split('.').filter((x) => x.length)

  arr.forEach((x) => {
    if (!hit_undefined) {
      const $path = x.trim().replace(/(\(.*\))$/, '')
      const args = parser({
        input: x.match(/(\(.*\))/g)?.[0]
      })

      if (output && typeof output[$path] !== 'undefined') {
        output = /(\(.*\))$/.test(x) ? output[$path](args) : output[$path]
      } else {
        hit_undefined = true
      }
    }
  })
  return output
}

export function convertSeconds(val, fallback) {
  if (isNaN(parseFloat(val)) || val === Infinity) {
    return fallback || 0
  }
  if (typeof val === 'number') {
    return Math.abs(val)
  }
  if (typeof val === 'string') {
    const seconds = /\d\s*s\s*$/.test(val)
    if (seconds) {
      return Math.abs(parseFloat(val) * 1000)
    }
    return Math.abs(parseFloat(val))
  }
}

export function camelCase(val) {
  if (typeof val === 'string') {
    return val.replace(/-./g, (x) => x.toUpperCase()[1])
  }
  return val
}

export function formatString(str) {
  return capitalize(
    `${str}`.replace(/\.|\?|!\s+\w/gi, (x) => `${x}`.toUpperCase())
  )
}

export function capitalize(val) {
  if (typeof val === 'string') {
    return val.replace(/^\s*\w{1,1}/g, (x) => x.toUpperCase())
  }
  return val
}

export function capitalizeAll(val) {
  if (typeof val === 'string') {
    return capitalize(val).replace(/\s+\w{1,1}/g, (x) => x.toUpperCase())
  }
  return val
}

export function eventKey(e) {
  let key = ''
  const spaceBar = /^space$/i.test(e.code) || e.keyCode === 32
  const enterKey = /^enter$/i.test(e.code) || e.keyCode === 13
  const esc = /^escape$/i.test(e.code) || e.keyCode === 27
  const tab = /^tab$/i.test(e.code) || e.keyCode === 9
  const arrowUp = /^arrowup$/i.test(e.code) || e.keyCode === 38
  const arrowRight = /^arrowright$/i.test(e.code) || e.keyCode === 39
  const arrowDown = /^arrowdown$/i.test(e.code) || e.keyCode === 40
  const arrowLeft = /^arrowleft$/i.test(e.code) || e.keyCode === 37
  const slash = /^slash/i.test(e.code) || e.key == '/' || e.keyCode == 191
  const backspace =
    /^backspace/i.test(e.code) || e.keyCode == 8 || /^backspace/i.test(e.key)
  const Delete =
    /^delete/i.test(e.code) || e.keyCode == 46 || /^delete/i.test(e.key)

  if (backspace) {
    key = 'backkey'
    return key
  }

  if (Delete) {
    key = 'delete'
    return key
  }

  if (arrowUp) {
    key = 'arrow_up'
    return key
  }
  if (arrowLeft) {
    key = 'arrow_left'
    return key
  }
  if (arrowDown) {
    key = 'arrow_down'
    return key
  }
  if (arrowRight) {
    key = 'arrow_right'
    return key
  }
  if (spaceBar) {
    key = 'spacebar'
    return key
  }
  if (enterKey) {
    key = 'enter'
    return key
  }
  if (esc) {
    key = 'esc'
    return key
  }
  if (tab) {
    key = 'tab'
    return key
  }
  if (slash) {
    key = 'slash'
    return key
  }
  return key
}

export class ArrowNavigate {
  constructor({ root, children, loop = true, preventScroll = false, closest }) {
    this.root = root
    this.$children = this.root.querySelectorAll(`${children}`)
    this.loop = loop
    this.preventScroll = preventScroll
    this.closest = closest || children

    this.focusableNodes =
      this.$children &&
      [...this.$children].filter((x) => {
        const validFocusable =
          isHTML(x) &&
          x.tabIndex > -1 &&
          x.getAttribute('tabindex') > -1 &&
          !x.getAttribute('disabled') &&
          x.offsetHeight
        return validFocusable
          ? this.closest
            ? x.closest(this.closest)
            : x
          : false
      })
    this.index =
      this.focusableNodes?.length &&
      this.focusableNodes.indexOf(
        this.focusableNodes.find((x) =>
          x.isSameNode(x.ownerDocument.activeElement)
        )
      )
  }

  forward(count = 0) {
    if (!this.focusableNodes.length) {
      return
    }
    const getIndex =
      this.index + 1 + count > this.focusableNodes.length - 1
        ? this.loop
          ? 0
          : this.focusableNodes.length - 1
        : this.index + 1 + count

    this.focusableNodes[getIndex].focus({ preventScroll: this.preventScroll })

    this.kill()
  }

  backward(count = 0) {
    if (!this.focusableNodes.length) {
      return
    }

    const getIndex =
      this.index - 1 - count < 0
        ? this.loop
          ? this.focusableNodes.length - 1
          : 0
        : this.index - 1 - count

    this.focusableNodes[getIndex].focus({ preventScroll: this.preventScroll })

    this.kill()
  }

  kill() {
    this.$children = 0
    this.root = 0
    this.focusableNodes = 0
  }
}

export function vibrate(d = 1) {
  typeof navigator.mozVibrate == 'function'
    ? navigator.mozVibrate(d)
    : navigator?.vibrate?.(d)
}
