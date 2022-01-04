<script>
import { capitalize, mountComplexPage } from '~/components/utils/main'
export default {
  name: 'SupportPage',
  data: () => ({
    selfName: 'SupportPage',
    renderedComponents: ['ListActions'],
  }),

  computed: {
    ...mountComplexPage.computed,

    supportGroups() {
      const items = (prepend, title, append) => {
        const callback = append
          ? async () => {
              this.$commit('UPDATE_', {
                path: 'title',
                innerPath: 'rootModal.meta',
                value: title,
              })

              await this.$nextTick()

              this.$commit('UPDATE_', {
                path: 'active',
                innerPath: 'rootModal',
                value: true,
              })
            }
          : undefined

        return {
          prependIcon: prepend,
          title,
          appendIcon: append ? 'chevronRight' : null,
          callback,
        }
      }

      return [
        {
          name: 'Support',
          items: [
            items('accountOfficer', 'Account officer', 1),
            items('forum', 'Live chat', 1),
            items('help', 'FAQ', 1),
            items('emoji', 'Send feedback', 1),
            items('alertOctagon', 'Report an issue', 1),
          ],
        },

        {
          name: 'Social media',
          items: [
            items('twitter', '@Minna_bank_demo'),
            items('facebook', 'MinnaBankDemo'),
            items('instagram', '@Minna_bank_demo'),
          ],
        },

        {
          name: 'Email us',
          items: [items('email', 'customersupport@Minnabank.demo')],
        },
      ]
    },
  },
  watch: {
    ...mountComplexPage.watch,
  },
  beforeCreate() {
    this.$commit('UPDATE_', {
      path: 'headerText',
      value: 'Support',
    })
  },
  mounted() {
    mountComplexPage.mounted.call(this)
  },
  methods: {
    ...mountComplexPage.methods,
  },
  render(h) {
    const scoping = { 'data-spge': '' }
    const h2 = (d, c) => h('h2', d, c)
    const span = (d, c) => h('span', d, c)
    const div = (d, c) => h('div', d, c)
    const listActions = (d) => h('listActions', d)

    return div(
      {
        attrs: { ...scoping },
        staticClass: 'root',
      },
      [
        h2(
          {
            attrs: { ...scoping },
            staticClass: 'title',
          },
          [
            `Good ${this.$store.state.greeting},`,
            span(
              {
                attrs: { ...scoping },
                staticClass: 'username',
              },
              [` ${capitalize(this.$store.state.user?.username || 'User')}.`]
            ),
          ]
        ),

        this.supportGroups.map((item, key) => {
          return listActions({
            key: `${key}-list`,
            props: {
              name: item.name,
              items: item.items,
            },
          })
        }),
      ]
    )
  },
}
</script>

<style>
.root[data-spge] {
  padding: 1.5rem 1.25rem;
}

.title[data-spge] {
  font-weight: 600;
  font-size: 1.75rem;
  margin-bottom: 1rem;
  color: var(--body-c);
}

#ui-root.md-up .title[data-spge] {
  font-size: 1.85rem;
}

.username[data-spge] {
  color: var(--caption-c);
  font-weight: 500;
  font-size: 0.875em;
}
</style>
