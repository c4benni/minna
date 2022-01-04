<script>
export default {
  name: 'ProfilesPage',
  data: () => ({
    form: {
      remember: null,
    },
  }),

  beforeMount() {
    let storedState = localStorage.getItem('user')

    if (typeof storedState == 'string') {
      storedState = JSON.parse(storedState)
    }

    this.form = storedState
  },

  render(h) {
    const scoping = { 'data-prpge': '' }
    const div = (d, c) => h('div', d, c)
    const icon = (d, c) => h('ui-icon', d, c)
    const btn = (d, c) => h('ui-btn', d, c)
    const input = (d, c) => h('ui-input', d, c)
    const form = (d, c) => h('ui-form', d, c)
    const h2 = (d, c) => h('h2', d, c)
    const h3 = (d, c) => h('h3', d, c)

    return div(
      {
        attrs: { ...scoping },
        staticClass: 'root',
      },
      [
        div(
          {
            attrs: { ...scoping },
            staticClass: 'header',
          },
          [
            icon({
              attrs: { ...scoping, name: 'camera' },
              staticClass: 'account-img fill-before',
            }),
            h2(
              {
                attrs: { ...scoping },
                staticClass: 'title',
              },
              [this.$store.state.user?.username || 'User']
            ),
          ]
        ),

        h3(
          {
            attrs: { ...scoping },
            staticClass: 'greeting',
          },
          ['Good ' + this.$store.state.greeting] + ','
        ),

        div(
          {
            attrs: { ...scoping },
            staticClass: 'main',
          },
          [
            form(
              {
                attrs: { ...scoping },
                staticClass: 'form',
                props: {
                  showSubmit: false,
                  name: 'edit profile',
                },
              },
              [
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

                      localStorage.setItem('user', JSON.stringify(this.form))
                    },
                  },
                }),
              ]
            ),

            btn(
              {
                attrs: { ...scoping },
                props: {
                  simpleButton: true,
                  background: this.$theme.light ? 'error' : undefined,
                },
                staticClass: 'action',
                on: {
                  '!click': () => {
                    this.$commit('UPDATE_', {
                      value: null,
                      path: 'user',
                    })
                  },
                },
              },
              [
                icon({
                  attrs: { ...scoping, name: 'logOut' },
                  staticClass: 'action-icon',
                }),
                'Logout',
              ]
            ),
          ]
        ),
      ]
    )
  },
}
</script>

<style>
.root[data-prpge] {
  height: 100%;
  display: grid;
  grid-template-rows: 180px auto auto;
  align-content: flex-start;
}

.header[data-prpge] {
  height: 100%;
  background: var(--theme-banner);
  display: grid;
  align-items: flex-end;
  grid-template-rows: 1fr auto;
  padding: 1.5rem;
  justify-items: center;
  row-gap: 0.75rem;
}

.light-theme .header[data-prpge] {
  background: var(--primary);
  color: #fff;
}

.account-img[data-prpge] {
  height: 96px;
  width: 96px;
  position: relative;
}

.account-img[data-prpge]::before {
  border: var(--ui-divide);
}

.light-theme .account-img[data-prpge]::before {
  border: 0.75px solid #fff;
  opacity: var(--t-caption);
}

.title[data-prpge] {
  font-size: 1.25rem;
  font-weight: 500;
}

.greeting[data-prpge] {
  padding: 1.5rem 1.5rem 1rem;
  color: var(--body-c);
  text-align: center;
}

.form[data-prpge] {
  background: var(--theme-primary);
  box-shadow: var(--raise-light);
  padding: 0.25rem 0.5rem 0.25rem;
  border-radius: 4px;
  max-width: 660px;
  margin: 1.5rem auto;
  width: calc(100% - 1.5rem);
}

.action[data-prpge] {
  margin: 0 auto;
  margin-top: 1rem;
  display: grid;
  grid-auto-flow: column;
  column-gap: 0.5rem;
  padding: 0 30px !important;
}

.dark-theme .action[data-prpge] {
  color: var(--error);
}
</style>
