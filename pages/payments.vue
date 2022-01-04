<script>
import { mountComplexPage } from '~/components/utils/main'
export default {
  name: 'PaymentPage',
  data: () => ({
    selfName: 'PaymentPage',
    renderedComponents: ['PageActions'],

    items: [
      {
        icon: 'sendMoney',
        title: 'Send money',
        desc: 'Send money to Minna banks or any other bank in Nigeria',
      },

      {
        icon: 'airtime',
        title: 'Airtime and Data',
        desc: 'Buy your airtime for any mobile network',
      },

      {
        icon: 'moneyDouble',
        title: 'Bills payment',
        desc: 'Renew your utitlity bills here.',
      },

      {
        icon: 'recieveMoney',
        title: 'Receive money',
        desc: 'Recieve money from friends and family in a few clicks',
      },

      {
        icon: 'casino',
        title: 'Top-up bet accounts',
        desc: 'Send money to any bet account of your choice easily',
      },

      {
        icon: 'qrCode',
        title: 'QR payments',
        desc: 'Scan QR codes and pay instantly',
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
      value: 'Payments',
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
            path: 'title',
            innerPath: 'rootModal.meta',
            value: this.items[e].title,
          })

          await this.$nextTick()

          this.$commit('UPDATE_', {
            path: 'active',
            innerPath: 'rootModal',
            value: true,
          })
        },
      },
    })
  },
}
</script>

<style></style>
