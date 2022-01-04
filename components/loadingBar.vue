<script>
export default {
  name: 'LoadingBar',
  props: {
    showLoading: Boolean,
  },
  data() {
    return {
      transform: -0,
      elapsedTime: 0,
      hideLoader: false,
      addAnimation: false,
      renderBar: false,
      notified: false,
    }
  },
  watch: {
    // async '$route.path'() {
    //   this.renderBar = false
    //   this.$commit('V_MODEL', {
    //     path: 'loadingBar',
    //     value: true,
    //   })
    //   await this.$sleep(16)
    //   this.renderBar = true
    //   this.hideLoader = false
    //   this.addAnimation = false
    //   this.transform = -10
    //   this.elapsedTime = 0
    //   this.notified = false
    //   this.startLoading()
    // },
    showLoading(n) {
      if (n) {
        this.renderBar = true
        this.hideLoader = false
        this.addAnimation = false
        this.transform = -10
        this.elapsedTime = 0
        this.startLoading()
      } else {
        this.stopLoading()
      }
    },
  },
  methods: {
    async startLoading() {
      if (!this.renderBar) {
        return
      }

      if (!this.showLoading) {
        return
      }
      if (this.transform <= 60) {
        this.addAnimation = this.transform > 45

        this.transform += 3

        await this.$sleep(this.elapsedTime * 10)
        this.elapsedTime += 5
        return requestAnimationFrame(this.startLoading)
      }
      if (this.transform <= 80) {
        // if (!this.notified) {
        //   this.notified = true

        //   this.$notify({
        //     icon: 'slowNetwork',
        //     title: 'Slow connection detected',
        //     type: 'error',
        //   })
        // }

        this.addAnimation = true
        this.transform += 1

        await this.$sleep(this.elapsedTime * 7.5)
        this.elapsedTime += 2.5
        return requestAnimationFrame(this.startLoading)
      } else if (this.transform < 98) {
        this.addAnimation = true

        this.transform += 0.25

        await this.$sleep(this.elapsedTime * 5)
        this.elapsedTime += 1

        return requestAnimationFrame(this.startLoading)
      } else if (this.transform >= 98) {
        await this.$sleep(100, true)

        if (!this.addAnimation) {
          return
        }

        this.stopLoading()

        await this.$sleep(100)

        this.$commit('V_MODEL', {
          path: 'errorPage',
          value: true,
        })
      }
    },
    async stopLoading() {
      this.addAnimation = false
      await this.$sleep(16, true)
      this.elapsedTime = 100
      this.transform = 100
      await this.$sleep(450)
      this.hideLoader = true
      this.transform = 0
      this.elapsedTime = 0
      this.renderBar = false
      this.notified = false
    },
  },
  render(h) {
    const div = (d, c) => h('div', d, c)

    return div({
      key: this.$route.path,
      attrs: { 'data-lbr': '' },
      staticClass: 'root',
      class: [
        {
          __animate: this.addAnimation,
          __hidden: !this.renderBar,
          'will-change': this.renderBar && !this.addAnimation,
          'opacity-0': this.hideLoader,
        },
      ],
      style: {
        '--x': `${this.transform - 100}%`,
      },
    })
  },
}
</script>

<style>
.root[data-lbr] {
  --color-duration: 1.5s;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 0.1875rem;
  background: currentColor;
  background: var(--background, var(--primary));
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
  pointer-events: none;
  transition: transform 0.2s linear, opacity 0.2s,
    background-color var(--color-duration) linear;
  overflow: hidden;
  z-index: 20000;
  isolation: isolate;
  --x: -100%;
  transform: translate3d(var(--x), 0, 0);
  opacity: 0.9;
}
.root[data-lbr].__hidden {
  display: none;
  transition: 0s;
}
.root[data-lbr].will-change {
  will-change: transform, opacity;
}
.root[data-lbr].opacity-0 {
  opacity: 0;
}
@-webkit-keyframes animating-loading-bar {
  0% {
    transform: translateX(-225%) translateZ(0);
  }
  to {
    transform: translateX(125%) translateZ(0);
  }
}
@keyframes animating-loading-bar {
  0% {
    transform: translateX(-225%) translateZ(0);
  }
  to {
    transform: translateX(125%) translateZ(0);
  }
}
.root[data-lbr].__animate:after {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  transform: translateX(-225%) translateZ(0);
  background-image: linear-gradient(
    90deg,
    hsla(0, 0%, 78.4%, 0),
    hsla(0, 0%, 100%, 0.75),
    hsla(0, 0%, 78.4%, 0)
  );
  -webkit-animation: animating-loading-bar 2s infinite
    cubic-bezier(0, 0.55, 0.45, 1) calc(var(--color-duration) * 0.5);
  animation: animating-loading-bar 2s infinite cubic-bezier(0, 0.55, 0.45, 1)
    calc(var(--color-duration) * 0.5);
}
</style>
