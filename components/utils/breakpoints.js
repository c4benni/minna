import { mediaListener, nextAnimFrame } from './main'

export default {
  data: {
    breakpointInput: {
      is: '',
      greater: '',
      lesser: '',
      orientation: ''
    }
  },

  computed: {
    breakpointQueries() {
      return [
        '<orientation>(orientation: landscape)',
        '<xxs>(min-width: 0px) and (max-width: 349px)',
        '<xs>(min-width: 350px) and (max-width: 599px)',
        '<sm>(min-width: 600px) and (max-width: 959px)',
        '<md>(min-width: 960px) and (max-width: 1279px)',
        '<lg>(min-width: 1280px) and (max-width: 1919px)',
        '<xl>(min-width: 1920px)'
      ]
    },
    breakpointOutput() {
      const input = this.breakpointInput
      const is = input.is

      const p = 'phone'
      const s = 'small'
      const po = 'portrait'
      const l = 'landscape'
      const la = 'large'
      const i = 'ipad'
      const t = 'tablet'
      const ip = 'ipad-pro'
      const m = 'mini-laptop'
      const L = 'laptop'

      let matches = [p, `${s}-${p}`, `${po}-${p}`]

      if (is == 'sm') {
        matches = [`${l}-${p}`, `${la}-${p}`, i, t, `${po}-${i}`, `${po}-${t}`]
      }

      if (is == 'md') {
        matches = [ip, `${po}-${ip}`, `${l}-${t}`, `${l}-${i}`, m]
      }

      if (is == 'lg') {
        matches = [L, `${ip}-${l}`]
      }

      if (is == 'xl') {
        matches = ['4k']
      }

      return {
        orientationAlias: this.breakpointInput.orientation.slice(0, 2),
        matches,
        ...input
      }
    }
  },

  mounted() {
    this.breakpointQueries.forEach((x, i) => {
      const regExp = /^<.+>/g
      const mediaQuery = window.matchMedia(x.replace(regExp, ''))
      const matches = mediaQuery.matches
      const name = this.getBreakpointMediaName(x)

      const greater = matches
        ? this.getBreakpointGreaterAndLesser(i).greater
        : null
      const lesser = matches
        ? this.getBreakpointGreaterAndLesser(i).lesser
        : null

      this.updateBreakpointMediaListener({
        matches,
        name,
        greater,
        lesser
      })

      mediaListener({
        media: mediaQuery,
        event: 'change',
        callback: (e) => {
          this.updateBreakpointMediaListener({
            matches: e.matches,
            index: i,
            name
          })
        }
      })
    })
  },

  methods: {
    getBreakpointMediaName(val) {
      const regExp = /^<.+>/g
      return val.match?.(regExp)?.[0]?.replace?.(/<|>/g, '')
    },

    getBreakpointGreaterAndLesser(index) {
      const greater = this.breakpointQueries
        .filter((_, id) => id > 0 && id >= index)
        .map((x) => this.getBreakpointMediaName(x))

      const lesser = this.breakpointQueries
        .filter((_, id) => id > 0 && id <= index)
        .reverse()
        .map((x) => this.getBreakpointMediaName(x))

      return {
        greater: greater.length > 1 ? greater.join('-') : '',
        lesser: lesser.length > 1 ? lesser.join('-') : ''
      }
    },

    async updateBreakpointMediaListener(e) {
      await nextAnimFrame()
      const name = e.name
      const index = e.index
      const isOrientation = /orientation/.test(name)
      const matches = e.matches
      const data = isOrientation ? (matches ? 'landscape' : 'portrait') : name

      const update = () => {
        if (isOrientation) {
          this.breakpointInput.orientation = data
        } else {
          this.breakpointInput.is = data

          const greater = e.greater
            ? e.greater
            : matches
            ? this.getBreakpointGreaterAndLesser(index).greater
            : null

          this.breakpointInput.greater = greater

          const lesser = e.lesser
            ? e.lesser
            : matches
            ? this.getBreakpointGreaterAndLesser(index).lesser
            : null

          this.breakpointInput.lesser = lesser
        }

        const value = { ...this.breakpointOutput }

        // this.$commit('UPDATE_', {
        //   path: 'breakpoints',
        //   value
        // })

        // Object.entries(value).forEach((x) => {
        //   this.$set(this.$breakpoints, x[0], x[1])
        // })

        this.$commit('UPDATE_', {
          path: 'breakpoints',
          value: { ...value }
        })
      }

      if (isOrientation) {
        update()
      } else if (e.matches) {
        update()
      }
    }
  }
}
