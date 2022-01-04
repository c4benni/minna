<script>
import { mountSingleComponent } from './utils/main'
export default {
  name: 'HomeUpdates',
  data: () => ({
    selfName: 'HomeUpdates',
    cards: [
      {
        title: 'Movies, tickets and travels',
        desc: 'All you need for your vacation is ready for you! Click to discover more...',
      },
      {
        title: 'Loans and credit request',
        desc: "Need an urgent loadn for your next big project? We'd love to give you a helping hand :).",
      },
      {
        title: 'Become a luck millionaire!',
        desc: 'Feeling lucky? Try our raffle draw here!',
      },
      {
        title: 'Need support?',
        desc: `Our readily available customer agents are happy to help you out. ALWAYS!`,
      },
      {
        title: 'Set your transaction limit',
        desc: 'Click here to manage your transaction limits.',
      },
      {
        title: 'Bills and utilities',
        desc: `Quickly pay for your utilities in few steps!`,
      },
    ],
  }),
  computed: {
    ...mountSingleComponent.computed,

    mdAndUp() {
      return /md-/.test(this.$store.state.breakpoints.lesser)
    },
  },
  mounted() {
    mountSingleComponent.mounted.call(this)
  },
  methods: {
    loremPicsum(n) {
      return `https://picsum.photos/800/600?image=${n * 10 + 10}`.replace(
        /=40/,
        '=80'
      )
    },
  },
  render(h) {
    const scoping = { 'data-hus': '' }
    const appSection = (d, c) => h('app-section', d, c)
    const div = (d, c) => h('div', d, c)
    const h2 = (d, c) => h('h2', d, c)
    const h3 = (d, c) => h('h3', d, c)
    const img = (d) => h('img', d)
    const btn = (d, c) => h('ui-btn', d, c)

    const card = ({ src, title, desc, key }) => {
      return btn(
        {
          key,
          attrs: { ...scoping },
          staticClass: 'card',
          props: {
            tag: 'div',
            simpleButton: true,
          },
        },
        [
          this.$c4.mounted
            ? img({
                attrs: {
                  ...scoping,
                  src,
                  alt: `${title} image`,
                  height: '244px',
                  loading: 'lazy',
                },
                staticClass: 'image',
              })
            : div(
                {
                  attrs: { ...scoping },
                  staticClass: 'image',
                },
                title
              ),

          div(
            {
              attrs: {
                ...scoping,
              },
              staticClass: 'card-footer',
            },
            [
              h2(
                {
                  attrs: { ...scoping },
                  staticClass: 'title',
                },
                title
              ),
              h3(
                {
                  attrs: { ...scoping },
                  staticClass: 'desc',
                },
                desc
              ),
            ]
          ),
        ]
      )
    }

    return appSection(
      {
        attrs: {
          title: 'Updates',
        },
        staticClass: 'home-updates',
      },
      [
        div(
          {
            attrs: { ...scoping },
            staticClass: 'root hide-scrollbar',
          },
          [
            this.cards.map((item, key) => {
              if (!this.mdAndUp && key > 3) {
                return null
              }

              return card({
                key,
                src: this.loremPicsum(key),
                desc: item.desc,
                title: item.title,
              })
            }),
          ]
        ),
      ]
    )
  },
}
</script>

<style>
.root[data-hpge] .home-updates {
  margin-top: 1rem;
}

.root[data-hus] {
  padding: 0.75rem 1.5rem;
  /* filter: var(--ds-lighter); */
  display: grid;
  overflow: auto hidden;
  grid-auto-flow: row;
  grid-template-columns: repeat(
    auto-fill,
    minmax(min(500px, calc(50% - 1.5rem)), 1fr)
  );
  gap: 0.75rem;
}

.root[data-hus]::after {
  width: 100%;
  content: '';
}

.mini-device .root[data-hus] {
  grid-auto-flow: column;
  grid-template-columns: repeat(4, min(600px, 100%)) 0.75rem;
  column-gap: 0.75rem;
  scroll-snap-type: x mandatory;
}

.card[data-hus] {
  box-shadow: var(--raise-light);
  display: block !important;
  padding: 0 !important;
  width: 100% !important;
  border-radius: var(--rounded);
  isolation: isolate;
  overflow: hidden;
  background: var(--theme-banner);
  scroll-snap-align: start;
  scroll-margin-left: 1.5rem;
  scroll-snap-margin-left: 1.5rem;
  white-space: initial !important;
}

#ui-root.strict-touch .card[data-hus]::before {
  display: none;
}

.dark-theme .card[data-hus] {
  background: var(--theme-primary);
}

.card-footer[data-hus] {
  padding: 0.75rem;
}

.image[data-hus] {
  object-fit: cover;
  height: 224px;
}

.card-footer[data-hus] {
  height: 96px;
}

.image[data-hus] {
  min-height: 230px;
}

.br-sm .card-footer[data-hus],
.br-xs .card-footer[data-hus] {
  height: 85px;
}

.br-sm .image[data-hus],
.br-xs .image[data-hus] {
  min-height: 224px;
}

.title[data-hus] {
  font-size: 1.15rem;
  line-height: 1.4;
  font-weight: 500;
  color: var(--title-c);
}

.desc[data-hus] {
  font-size: 0.9rem;
  font-weight: 300;
  line-height: 1.4;
  color: var(--subtitle-c);
}
</style>
