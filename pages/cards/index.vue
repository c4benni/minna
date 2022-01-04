<script>
import { mountComplexPage } from '~/components/utils/main'
export default {
  name: 'CardPage',
  data: () => ({
    selfName: 'CardPage',
    renderedComponents: ['PageActions'],

    items: [
      {
        icon: 'viewCard',
        title: 'View your cards',
        desc: 'View and customize your existing, active cards',
      },

      {
        icon: 'requestCard',
        title: 'Request a new card',
        desc: 'Create a new virtual or physical card easliy',
      },

      {
        icon: 'blockCard',
        title: 'Card control',
        desc: 'Disable or enable your active cards',
      },
    ],
  }),
  computed: {
    ...mountComplexPage.computed,
    breakpoints() {
      return this.$store.state.breakpoints
    },
  },
  watch: {
    ...mountComplexPage.watch,
  },
  beforeCreate() {
    this.$commit('UPDATE_', {
      path: 'headerText',
      value: 'Cards',
    })
  },
  mounted() {
    mountComplexPage.mounted.call(this)
  },
  methods: {
    ...mountComplexPage.methods,
  },
  render(h) {
    const pageActions = (d) => h('pageActions', d)

    return pageActions({
      props: {
        items: this.items,
      },
      on: {
        'detail-btn-click': async (e) => {
          this.$commit('UPDATE_', {
            path: 'headerText',
            value: this.items[e].title,
          })

          await this.$nextTick()

          this.$router.push('/blank/cards-page')
        },
      },
    })
  },
}
</script>

<style></style>
