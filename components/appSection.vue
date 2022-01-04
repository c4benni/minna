<script>
export default {
  name: 'AppSection',
  functional: true,
  inheritAttrs: false,
  props: {
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    bottomPadding: {
      type: Boolean,
      default: true,
    },
    divideBottom: {
      type: Boolean,
      default: true,
    },
    tag: {
      type: String,
      default: 'section',
    },
    useHeaderSlots: Boolean,
  },
  render(h, c) {
    const scoping = { 'data-asn': '' }
    const data = c.data
    const props = {
      ...c.props,
      ...data.attrs,
    }

    const attrs = {
      ...data.attrs,
    }

    delete attrs.description
    delete attrs.divideBottom
    delete attrs.bottomPadding

    const h2 = (d, c) => h('h2', d, c)
    const p = (d, c) => h('p', d, c)

    // props.useHeaderSlots && console.log(c.children)

    return h(
      props.tag,
      {
        ...data,
        attrs: {
          ...scoping,
          'aria-label': props.title,
          ...attrs,
        },
        staticClass: `root${
          c.data.staticClass ? ` ${c.data.staticClass}` : ''
        }`,
        class: [
          {
            'fill-before': props.divideBottom,
            'no-bottom-padding': !props.bottomPadding,
          },
        ],
      },
      [
        props.title.length
          ? h2(
              {
                attrs: {
                  ...scoping,
                },
                staticClass: 'title line-clamp-1',
                domProps: !props.useHeaderSlots
                  ? {
                      innerHTML: props.title,
                    }
                  : undefined,
              },
              props.useHeaderSlots
                ? [
                    c?.scopedSlots.prependHeader?.(),
                    props.title,
                    c?.scopedSlots.appendHeader?.(),
                  ]
                : undefined
            )
          : null,
        props.description.length
          ? p({
              attrs: {
                ...scoping,
              },
              staticClass: 'description line-clamp-2',
              domProps: {
                innerHTML: props.description,
              },
            })
          : null,
        c.slots()?.default || '',
      ]
    )
  },
}
</script>

<style>
.root[data-asn] {
  position: relative;
  padding-bottom: 1.5rem;
  display: grid;
  --divide-offset: 3rem;
  --half-offset: calc(var(--divide-offset) / 2);
  --heading-padding: 0 var(--half-offset);
}

.root[data-asn].no-padding-bottom {
  padding-bottom: 0;
}

.root[data-asn]:not(:last-child)::before {
  border-bottom: var(--ui-divide);
  width: calc(100% - var(--divide-offset));
  left: var(--half-offset);
  border-bottom-width: 0.75px;
}

.title[data-asn] {
  margin: 0.5rem 0;
  padding: var(--heading-padding);
  font-size: 1.15rem;
  font-weight: 500;
  color: var(--primary);
  position: relative;
}

.title[data-asn] > .line-through {
  opacity: var(--t-disabled);
  font-weight: 400;
  font-size: 2rem;
  margin-left: 0.35rem;
  align-self: center;
}

.description[data-asn] {
  padding: var(--heading-padding);
  font-size: 0.9875rem !important;
  font-weight: 400 !important;
  color: var(--subtitle-c);
  margin-bottom: 2rem;
  line-height: 1.4;
  letter-spacing: 0.4px;
}
</style>
