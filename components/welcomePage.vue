<script>
import { logoSVG } from './utils/main'
export default {
  name: 'WelcomePage',
  data: () => ({
    form: {
      username: '',
      password: 'password',
      showPassword: false,
      remember: false,
    },

    loginToggled: 0,

    showLogo: true,

    imgLoaded: false,
  }),
  computed: {
    showLogin() {
      return !!this.$route.query.loginForm
    },
    signingIn() {
      return this.$store.state.signingIn
    },
  },
  watch: {
    showLogin() {
      this.imgLoaded = false

      if (this.$c4.mounted) {
        this.loginToggled += 1
      }
    },
  },
  beforeMount() {
    const recentUser = localStorage.getItem('recentUser')

    if (recentUser) {
      this.form.username = recentUser
    }
  },
  render(h) {
    if (!this.$c4.mounted) {
      return
    }
    const scoping = { 'data-wpe': '' }
    const div = (d, c) => h('div', d, c)
    const h1 = (d, c) => h('h1', d, c)
    const h2 = (d, c) => h('h2', d, c)
    const btn = (d, c) => h('ui-btn', d, c)
    const icon = (d, c) => h('ui-icon', d, c)

    const form = (d, c) => h('ui-form', d, c)
    const input = (d, c) => h('ui-input', d, c)

    const mdAndUp = /md-/.test(this.$store.state.breakpoints.lesser)

    const textDivide = (d, c) => h('textDivide', d, c)

    const login = () => {
      return div(
        {
          key: `login-${this.showLogin}`,
          attrs: { ...scoping },
          staticClass: 'login',
          class: [
            {
              'fade-slide-x-appear': mdAndUp,
              'fade-slide-y-appear': !mdAndUp,
            },
          ],
          on: {
            animationstart: (e) => {
              if (e.target == e.currentTarget) {
                this.showLogo = false
              }
            },
          },
        },
        [
          div(
            {
              attrs: { ...scoping },
              staticClass: 'login-hero',
            },
            [
              logoSVG.call(this, {
                h,
                size: '38px',
              }),

              h2(
                {
                  attrs: { ...scoping },
                  staticClass: 'login-title',
                },
                'Welcome back!'
              ),
            ]
          ),

          form(
            {
              attrs: { ...scoping },
              props: {
                name: 'login',
                submitText: 'Log in',
              },
              on: {
                'submit-form': async () => {
                  localStorage.setItem('recentUser', this.form.username)

                  this.$commit('UPDATE_', {
                    value: true,
                    path: 'signingIn',
                  })

                  await this.$sleep(2000)

                  this.$commit('UPDATE_', {
                    path: 'user',
                    value: {
                      username: this.form.username,
                      remember: this.form.remember,
                    },
                  })

                  localStorage.setItem(
                    'user',
                    JSON.stringify({
                      username: this.form.username,
                      remember: this.form.remember,
                    })
                  )

                  this.$commit('UPDATE_', {
                    value: false,
                    path: 'signingIn',
                  })

                  this.$router.replace({ query: {} })
                },
              },
            },
            [
              [
                {
                  label: 'Username',
                  autocomplete: 'username',
                  id: 'login-username',
                  vmodel: this.form.username,
                  validator: (e) => {
                    if (!e) {
                      return 'Required'
                    }
                    return true
                  },
                  pattern: '.+',
                  placeholder: 'Type something',
                  type: 'text',
                },
                {
                  label: 'Password',
                  type: 'password',
                  id: 'login-password',
                  vmodel: this.form.password,
                  validator: (e) => {
                    const value = e?.trim()
                    if (!value.length) {
                      return 'Required'
                    }
                    if (value.length < 2) {
                      return 'Min length is 2'
                    }
                    return true
                  },
                  pattern: '.+',
                  showPassword: this.form.showPassword,
                  autocomplete: 'current-password',
                  placeholder: '2+ characters',
                },
              ].map((item, key) => {
                return input({
                  key,
                  props: {
                    label: item.label,
                    autocomplete: item.autocomplete,
                    id: item.id,
                    validator: item.validator,
                    vmodel: item.vmodel,
                    pattern: item.pattern,
                    placeholder: item.placeholder,
                    type: item.type,
                    showPassword: item.showPassword,
                  },
                  on: {
                    vmodel: (e) => {
                      this.form[item.label.toLowerCase()] = e
                    },
                    'append-click': () => {
                      this.form.showPassword = !this.form.showPassword
                    },
                  },
                })
              }),

              btn(
                {
                  props: {
                    size: 'sm',
                    color: 'info',
                    text: true,
                    tag: 'div',
                  },
                  attrs: {
                    ...scoping,
                    title: 'forgot password',
                  },
                  staticClass: 'forgot-password',
                },
                `Forgot password?`
              ),

              input({
                props: {
                  label: 'Remember me',
                  id: 'login-save-info',
                  type: 'switch',
                  vmodel: this.form.remember,
                  required: false,
                  validator: () => {
                    return true
                  },
                  topSlot: false,
                  hint: this.form.remember
                    ? `Your login info will be remembered on this device.`
                    : `You will need to login on your next visit.`,
                },
                on: {
                  vmodel: (e) => {
                    this.form.remember = e
                  },
                },
              }),

              div(
                {
                  slot: 'append',
                  attrs: { ...scoping },
                  staticClass: 'form-append',
                },
                [
                  textDivide({ staticClass: 'divide' }, [`New user?`]),
                  btn(
                    {
                      props: {
                        text: true,
                        color: 'info',
                        block: true,
                        tag: 'div',
                        filledText: true,
                        actionButton: true,
                      },
                      style: {
                        opacity: this.signingIn
                          ? 'var(--t-disabled)'
                          : undefined,
                      },
                      attrs: { ...scoping, title: 'click to sign up' },
                      staticClass: 'sign-up-alt',
                      on: {
                        click: () => {
                          this.$emit('updateTemplate', 'sign-up')
                        },
                      },
                    },
                    'Sign up'
                  ),
                ]
              ),
            ]
          ),

          icon({
            attrs: {
              ...scoping,
              name: 'backspace',
              clickable: true,
              size: 'lg',
              title: 'back to welcome page',
            },
            on: {
              '!click': () => {
                this.$router.replace({ query: {} })
              },
            },
            staticClass: 'backspace cursor-pointer',
          }),
        ]
      )
    }

    return this.showLogin
      ? login()
      : div(
          {
            key: `welcome-${!this.showLogin}`,
            attrs: { ...scoping },
            staticClass: 'root',
            class: this.loginToggled
              ? [
                  {
                    'fade-slide-x-appear': mdAndUp,
                    'fade-slide-y-appear': !mdAndUp,
                  },
                ]
              : undefined,
            on: {
              animationend: async (e) => {
                if (e.target == e.currentTarget) {
                  await this.$sleep(100)
                  this.showLogo = true
                }
              },
            },
          },
          [
            this.showLogo
              ? div(
                  {
                    key: this.showLogo + 'div',
                    attrs: { ...scoping },
                    staticClass: 'logo-wrap',
                  },
                  [logoSVG.call(this, { h })]
                )
              : null,
            div(
              {
                attrs: { ...scoping },
                staticClass: 'intro',
              },
              [
                h1(
                  {
                    attrs: { ...scoping },
                    staticClass: 'title',
                  },
                  ['Welcome to Minna Bank']
                ),
                h2(
                  {
                    attrs: { ...scoping },
                    staticClass: 'desc',
                  },
                  'Making your banking experience an enjoyable one'
                ),

                div(
                  {
                    attrs: { ...scoping },
                    staticClass: 'action-wrap',
                  },
                  [
                    {
                      title: 'Get started',
                      background: 'primary',
                    },
                    {
                      title: 'Log in',
                      color: 'primary',
                      outlined: true,
                    },
                  ].map((item, key) => {
                    return btn(
                      {
                        key,
                        props: {
                          background: item.background,
                          outlined: item.outlined,
                          color: item.color,
                        },
                        on: {
                          '!click': () => {
                            this.$router.push({
                              query: {
                                loginForm: 'true',
                              },
                            })
                          },
                        },
                      },
                      item.title
                    )
                  })
                ),
              ]
            ),

            h('img', {
              attrs: {
                ...scoping,
                alt: 'welcome image',
                src: 'img/welcome.png',
                height: mdAndUp ? '200px' : '250px',
                width: mdAndUp ? '400px' : '100%',
              },
              on: {
                '~load': () => {
                  this.imgLoaded = true
                },
              },
              staticClass: 'image',
              class: [
                {
                  'img-loaded fade-appear': this.imgLoaded,
                },
              ],
            }),
          ]
        )
  },
}
</script>

<style>
.root[data-wpe] {
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows: 44px 250px 1fr;
  padding: 2.5rem 1.5rem 1rem;
  align-content: flex-start;
  row-gap: 1.5rem;
  --appear-duration: 200ms;
  --slide-y: 1rem;
  --slide-x: 1rem;
}

.logo-wrap[data-wpe] {
  top: 1rem;
  justify-self: center;
  grid-row-start: 1;
  grid-row-end: 2;
  animation: fade-appear 0.2s linear;
}

.sm-up .root[data-wpe] {
  grid-template-rows: 1fr;
  grid-template-columns: 1fr min(600px, min(35vw, var(--max-width)));
  width: min(100vw, var(--max-width));
  align-items: center;
  justify-items: center;
  padding-right: max(1.5rem, 2vw);
  padding-top: 0.5rem;
}

.sm-up .logo-wrap[data-wpe] {
  position: absolute;
  transform: translateY(1rem);
  justify-self: center;
}

.br-sm .logo-wrap[data-wpe] {
  transform: translateY(0.5rem);
}

.image[data-wpe] {
  grid-row-start: 2;
  grid-row-end: 3;
  width: 100%;
  height: 250px;
  --appear-duration: 150ms;
}

.sm-up .image[data-wpe],
.sm-up .intro[data-wpe] {
  grid-row-start: 1;
  grid-row-end: 2;
}

.sm-up .image[data-wpe] {
  width: min(600px, min(35vw, var(--max-width)));
  height: auto;
}

.intro[data-wpe] {
  grid-row-start: 3;
  grid-row-end: 4;
  display: grid;
  align-content: flex-start;
  justify-content: center;
  justify-items: center;
}

.title[data-wpe] {
  font-size: 1.75rem;
  color: var(--title-c);
  margin: 0.75rem 0 0.5rem;
  text-align: center;
}

.sm-up .title[data-wpe] {
  font-size: max(3vw, 3.75rem);
}

.desc[data-wpe] {
  font-size: 1rem;
  font-weight: 400;
  color: var(--subtitle-c);
  margin-bottom: 3rem;
  text-align: center;
}

.md-up .title[data-wpe] {
  font-size: max(1vw, 2.5rem);
}

.br-sm .title[data-wpe] {
  font-size: max(0.75vw, 2rem);
}

.action-wrap[data-wpe] {
  display: grid;
  grid-auto-flow: column;
  column-gap: 1rem;
  align-items: center;
  justify-content: center;
  margin-bottom: 42px;
}

.login[data-wpe] {
  --appear-duration: 200ms;
  max-width: 660px;
  width: 100%;
  padding: 1.5rem;
  display: grid;
  align-content: flex-start;
  position: relative;
  margin-left: auto;
  margin-right: auto;
}

.sm-up .login[data-wpe] {
  justify-self: center;
  margin-top: 3rem;
}

.backspace[data-wpe] {
  position: absolute;
  top: 0;
  left: 0;
  background: none;
  margin: 1.5rem;
}

.login-hero[data-wpe] {
  display: grid;
  place-items: center;
  row-gap: 0.75rem;
}

.login-title[data-wpe] {
  font-size: 1.5rem;
  color: var(--color-c);
}

.ui-form[data-wpe] {
  margin-top: 1.5rem;
  display: grid;
}

.ui-form[data-wpe] .login-password {
  margin-bottom: 0;
}

.ui-form[data-wpe] .login-password,
.ui-form[data-wpe] .login-username {
  margin-right: 0;
}

.ui-form[data-wpe] .switch {
  margin: 0.75rem 0 3rem;
}

.ui-form[data-wpe] .submit-form {
  margin-bottom: 1.5rem;
}

.dark-theme .ui-form[data-wpe] .submit-form {
  color: #000;
}

.ui-form[data-wpe] .submit-form,
.ui-form[data-wpe] .form-append {
  width: calc(100% - 1.5rem);
  margin: 0 auto;
}

.ui-form[data-wpe] .form-append {
  margin-top: 1.5rem;
  display: grid;
  row-gap: 1.5rem;
  padding: 0 1rem;
}
</style>
