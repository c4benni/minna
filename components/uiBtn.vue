<script>
export default {
  name: 'UiBtn',
  functional: true,
  props: {
    asWrapper: Boolean,
    actionButton: Boolean,
    componentProps: {
      type: Object,
      default: () => ({}),
    },
    persistent: Boolean,
    tag: {
      type: String,
      default: 'button',
    },
    to: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'md',
    },
    text: {
      type: Boolean,
      default: false,
    },
    flat: {
      type: Boolean,
      default: false,
    },
    raise: {
      type: [Boolean, String],
      default: false,
    },
    outlined: {
      type: Boolean,
      default: false,
    },
    outlinedOpacity: {
      type: [Number, String],
      default: '0.5',
    },
    icon: {
      type: Boolean,
      default: false,
    },
    block: {
      type: Boolean,
      default: false,
    },
    shape: {
      type: String,
      default: 'round',
    },
    background: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: '',
    },
    fill: {
      type: String,
      default: undefined,
    },
    case: {
      type: String,
      default: 'initial',
    },
    value: {
      type: String,
      default: undefined,
    },
    readonly: Boolean,
    simpleButton: Boolean,
    nativeOn: Boolean,
    config: {
      type: Object,
      default: () => undefined,
    },
    filledText: Boolean,
    filledOpacity: {
      type: [String, Number],
      default: '0.15',
    },
    activeScale: {
      type: String,
      default: undefined,
    },
  },

  render(h, c) {
    const attrs = c.data?.attrs || {}

    const slots = c.slots?.()

    const props = c.props

    const listeners = c.data.on

    const staticClass = c.data.staticClass

    const $class = c.data.class

    const canRaise = () => !props.flat && !props.text && !props.outlined

    const span = (d, c) => h('span', d, c)

    const slot = slots?.default?.[0] || {}

    const slotText = slot?.text

    const isText = slot?.tag === undefined && typeof slotText === 'string'

    const title = () => {
      if (attrs.title) {
        return attrs.title
      }
      const text = slotText

      if (isText) {
        return text
      }
    }

    const asWrapper = {
      __readonly: props.readonly,
      '__filled-text': props.filledText,
      __flat: props.flat,
      __disabled: props.disabled,
      'theme-primary':
        props.background === '' && !props.text && !props.outlined,
      '__default-color': props.color === '' && (props.text || props.outlined),
      __outlined: props.outlined,
    }

    return h(
      'ui-clickable',
      {
        ...c.data,
        props: {
          tag: props.tag,
          persistent: props.persistent,
          nativeOn: props.nativeOn || /nuxt-link|router-link/i.test(props.tag),
          config: props.config,
          componentProps: {
            to: props.to,
            ...props.componentProps,
          },
        },
        attrs: {
          role: !/button/i.test(props.tag) ? 'button' : undefined,
          ...attrs,
          tabindex: !/button/i.test(props.tag)
            ? props.disabled || props.readonly
              ? '-1'
              : '0'
            : props.disabled || props.readonly
            ? '-1'
            : undefined,
          ...attrs,
          disabled: props.disabled,
          value: props.value,
          title: title()?.toLowerCase?.() || '',
        },
        staticClass: `ui-btn${staticClass ? ` ${staticClass}` : ''}`,
        class: [
          $class,
          props.asWrapper
            ? { ...asWrapper }
            : {
                ...asWrapper,
                __sm: /^sm$|^small$/i.test(props.size),
                __md: /^md$|^medium$/i.test(props.size),
                __lg: /^lg$|^large$/i.test(props.size),
                __prepend: !!slots.prepend,
                __append: !!slots.append,
                __text: props.text,

                __tile: /tile/i.test(props.shape) && !props.icon,
                __round: /round/i.test(props.shape) && !props.icon,
                __pill: /pill/i.test(props.shape) && !props.icon,
                __circle: /circle/i.test(props.shape) && !props.icon,
                __icon: props.icon,

                __block: props.block && !props.icon,
                '__case-capitalize': /capitalize/i.test(props.case),
                '__case-upper': /^caps$|^uppercase$|^upper$/i.test(props.case),
                '__case-lower': /^low$|^lowercase$|^lower$/i.test(props.case),
                '__case-initial': /^initial$/i.test(props.case),

                __action: props.actionButton,
              },
          !props.text && !props.outlined ? props.background : '',
          props.color
            ? /-text$/i.test(props.color)
              ? props.color
              : `${props.color}-text`
            : '',
          props.raise === true && canRaise
            ? 'raise-light'
            : typeof props.raise === 'string' && canRaise
            ? props.raise
            : '',
        ],
        style:
          props.filledText || props.outlined
            ? {
                '--fill-opacity': props.filledText
                  ? props.filledOpacity
                  : undefined,
                '--outlined-opacity': props.outlined
                  ? props.outlinedOpacity
                  : undefined,
                '--fill': props.fill,
                '--active-scale': props.activeScale,
                ...c.data.style,
              }
            : c.data.style,
        on: {
          ...listeners,
        },
      },
      [
        slots.prepend && slots.prepend,
        isText || props.icon || props.simpleButton
          ? slots.default
          : span({ staticClass: '__default-slot' }, [slots.default]),
        slots.append && slots.append,
        props.outlined &&
          span({ attrs: { 'aria-hidden': 'true' }, staticClass: 'outline' }),
      ]
    )
  },
}
</script>

<style>
.ui-btn {
  --btn__size-sm: 32px;
  --btn__size-md: 42px;
  --btn__size-lg: 56px;
  --btn__size-text-sm: 22px;
  --btn__size-text-md: 32px;
  --btn__size-text-lg: 42px;
  --icon__size-sm: 32px;
  --icon__size-md: 38px;
  --icon__size-lg: 48px;
  --padding-sm: 3px 5px;
  --padding-md: 4px 15px;
  --padding-lg: 8px 15px;
  --padding__text-sm: 0 0.5rem;
  --padding__text-md: 0 0.825rem;
  --padding__text-lg: 2px 1.25rem;
  --fontSize-sm: 0.8275rem;
  --lineHeight-sm: 1.1;
  --fontSize-md: 16px;
  --lineHeight-md: 1.3;
  --fontSize-lg: 19px;
  --lineHeight-lg: 1.5;
  --pill__padding-sm: 5.6px 14px;
  --pill__padding-md: 9.6px 22px;
  --pill__padding-lg: 10.4 30px;
  --circle__padding-sm: 4px;
  --circle__padding-md: 4px;
  --circle__padding-lg: 4px;
  --border-radius-pill: 1.6rem;
  --gap-sm: 4px;
  --gap-md: 6px;
  --gap-lg: 8px;
  --before-color: inherit;
  --fill-opacity: 0.15;
  -webkit-appearance: none;
  font-weight: 500;
  font-family: var(--default-font-family);
  overflow: hidden;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 0.5px;
  word-spacing: 0.8px;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  border: none;
  outline: 0;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  transition: 0.2s transform linear, 0.1s opacity, 0.1s filter;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  isolation: isolate;
  white-space: nowrap;
}

.ui-btn.__default-color {
  color: inherit;
}

.ui-btn.__tile {
  border-radius: 0;
}

.ui-btn.__filled-text {
  background: 0 0 !important;
}

.ui-btn.__filled-text:not(.Active):before {
  opacity: 0.15;
  opacity: var(--fill-opacity, 0.15);
}

@media (hover: hover) and (pointer: fine) {
  .ui-btn.__filled-text:not(:hover):not(.Active):before {
    opacity: 0.2;
  }
}

.ui-btn.__readonly {
  pointer-events: none !important;
}

.ui-btn.__append:not(.__prepend),
.ui-btn.__prepend:not(.__append) {
  grid-template-columns: auto 1fr;
}

.ui-btn.__prepend.__append {
  grid-template-columns: auto 1fr auto;
}

.ui-btn[class*='pend'].__sm {
  grid-column-gap: var(--gap-sm);
  -moz-column-gap: var(--gap-sm);
  column-gap: var(--gap-sm);
}

.ui-btn[class*='pend'].__md {
  grid-column-gap: var(--gap-md);
  -moz-column-gap: var(--gap-md);
  column-gap: var(--gap-md);
}

.ui-btn[class*='pend'].__lg {
  grid-column-gap: var(--gap-lg);
  -moz-column-gap: var(--gap-lg);
  column-gap: var(--gap-lg);
}

.ui-btn > .material-design-icon {
  height: 100%;
  display: flex;
  align-items: center;
}

.ui-btn > .__default-slot {
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
}

.ui-btn > span.outline {
  position: absolute;
  top: 0;
  height: 100%;
  left: 0.75px;
  width: calc(100% - 1.5px);
  border-radius: inherit;
  pointer-events: none;
  border: 1.5px solid;
  opacity: var(--outlined-opacity);
  transition: none;
  transform: none !important;
}

.ui-btn.__case-lower {
  text-transform: lowercase;
}

.ui-btn.__case-upper {
  text-transform: uppercase;
}

.ui-btn.__case-inital {
  text-transform: none;
}

.ui-btn.__case-capitalize {
  text-transform: capitalize;
}

.ui-btn:after,
.ui-btn:before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  pointer-events: none;
  color: inherit;
  transition: opacity 0.1s linear;
  z-index: -1;
}

.ui-btn:after {
  transform: scale(0.995);
  border: 2px solid;
  opacity: 0;
  transition: 0s;
}

.ui-btn:before {
  background-color: var(--fill-background, var(--primary));
  opacity: 0;
  z-index: -1;
}

.ui-btn.focus-visible:after,
.ui-btn:focus-visible:after {
  opacity: var(--t-disabled);
}

.ui-btn:focus-visible::before,
.ui-btn:focus-visible::before {
  transition: 0s !important;
}

.ui-btn.__outlined.focus-visible:after,
.ui-btn.__outlined:focus-visible:after {
  opacity: var(--t-caption);
}

@media (hover: hover) and (pointer: fine) {
  .ui-btn:hover {
    filter: brightness(0.875);
  }

  .ui-btn:hover:before {
    opacity: 0.15;
  }

  .ui-btn[focus-within]:before {
    opacity: 0.25;
  }

  .ui-btn:focus-within:before {
    opacity: 0.25;
  }

  .ui-btn.Active:before {
    opacity: 0.25;
  }
}

.ui-btn.Active:before {
  opacity: 0.2;
  transition: 0s;
}

/* .ui-btn.Active.__filled-text:before,
.ui-btn.Active.__text:before {
  background: var(--primary) !important;
} */

.ui-btn.slow-active,
.ui-btn.slow-active:before {
  transition-duration: 0.15s !important;
  transition-timing-function: linear !important;
}

.ui-btn.Active {
  transition: transform 0.2 transform linear;
  transform: scale3d(0.98, 0.98, 1);
}

.ui-btn.__icon.Active,
.ui-btn.__sm.Active {
  transition: transform 0.2s transform linear;
  transform: scale3d(0.95, 0.95, 1);
}

.ui-btn.__disabled:before {
  opacity: 0;
}

.ui-btn.__outlined,
.ui-btn.__text {
  background: 0 0;
}

.ui-btn.__sm.__round {
  border-radius: var(--rounded-sm);
}

.ui-btn.__md.__round {
  border-radius: var(--rounded);
}

.ui-btn.__lg.__round {
  border-radius: var(--rounded-lg);
}

.ui-btn.__pill {
  border-radius: var(--border-radius-pill);
}

.ui-btn.__sm.__pill {
  padding: var(--pill__padding-sm);
}

.ui-btn.__md.__pill {
  padding: var(--pill__padding-md);
}

.ui-btn.__lg.__pill {
  padding: var(--pill__padding-lg);
}

.ui-btn.__circle {
  border-radius: 50%;
}

.ui-btn.__sm.__circle {
  height: var(--btn__size-sm);
  width: var(--btn__size-sm);
  padding: var(--circle__padding-sm);
}

.ui-btn.__md.__circle {
  height: var(--btn__size-md);
  width: var(--btn__size-md);
  padding: var(--circle__padding-md);
}

.ui-btn.__lg.__circle {
  height: var(--btn__size-lg);
  width: var(--btn__size-lg);
  padding: var(--circle__padding-lg);
}

.ui-btn.__sm {
  padding: var(--padding-sm);
  min-height: var(--btn__size-sm);
  height: -webkit-fit-content;
  height: -moz-fit-content;
  height: fit-content;
  font-size: var(--fontSize-sm);
  line-height: var(--lineHeight-sm);
}

.ui-btn.__sm.__text {
  min-height: var(--btn__size-text-sm);
}

.ui-btn.__md {
  padding: var(--padding-md);
  min-height: var(--btn__size-md);
  height: -webkit-fit-content;
  height: -moz-fit-content;
  height: fit-content;
  font-size: var(--fontSize-md);
  line-height: var(--lineHeight-md);
}

.ui-btn.__md.__text {
  min-height: var(--btn__size-text-md);
}

.ui-btn.__lg {
  padding: var(--padding-lg);
  min-height: var(--btn__size-lg);
  height: -webkit-fit-content;
  height: -moz-fit-content;
  height: fit-content;
  font-size: var(--fontSize-lg);
  line-height: var(--lineHeight-lg);
}

.ui-btn.__lg.__text {
  min-height: var(--btn__size-text-lg);
  height: var(--btn__size-text-lg);
}

.ui-btn.__text.__sm {
  padding: var(--padding__text-sm);
}

.ui-btn.__text.__md {
  padding: var(--padding__text-md);
}

.ui-btn.__text.__lg {
  padding: var(--padding__text-lg);
}

.ui-btn.__icon {
  padding: 0 !important;
  border-radius: 50%;
}

.ui-btn.__sm.__icon {
  height: var(--icon__size-sm);
  max-height: var(--icon__size-sm);
  min-height: var(--icon__size-sm);
  width: var(--icon__size-sm);
  max-width: var(--icon__size-sm);
  min-width: var(--icon__size-sm);
}

.ui-btn.__md.__icon {
  height: var(--icon__size-md);
  max-height: var(--icon__size-md);
  min-height: var(--icon__size-md);
  width: var(--icon__size-md);
  max-width: var(--icon__size-md);
  min-width: var(--icon__size-md);
}

.ui-btn.__lg.__icon {
  height: var(--icon__size-lg);
  max-height: var(--icon__size-lg);
  min-height: var(--icon__size-lg);
  width: var(--icon__size-lg);
  max-width: var(--icon__size-lg);
  min-width: var(--icon__size-lg);
}

#ui-root .ui-btn.__disabled {
  box-shadow: none;
  opacity: var(--t-disabled);
}

.ui-btn.__disabled:not(.__text):not(.transparent) {
  /* background: var(--disabled) !important; */
  filter: grayscale(0.9) brightness(0.5);
}

.light-theme .ui-btn.__disabled {
  /* color: #3b3b3b !important; */
  pointer-events: none;
}

.dark-theme .ui-btn.__disabled {
  /* color: hsla(0, 0%, 100%, 0.46667) !important; */
  pointer-events: none;
}

.ui-btn.__text.__disabled,
.ui-btn.__outlined.__disabled {
  background: 0 0 !important;
  border-color: var(--disabled) !important;
  color: var(--disabled) !important;
}

.ui-btn.__block {
  display: grid;
  grid-auto-flow: column;
  column-gap: 0.5rem;
  width: 100%;
}

.ui-btn.__action {
  --bg-direction: to right;
  height: 48px;
  border-radius: var(--pill) !important;
}
.ui-btn.__action.primary {
  background: linear-gradient(
    var(--bg-direction),
    var(--secondary),
    var(--primary)
  ) !important;
}

.ui-btn.__action.info {
  background: linear-gradient(
    var(--bg-direction),
    var(--info),
    var(--info-gradient, #db4444)
  ) !important;
}

.ui-btn.root[data-aig] {
  padding: 0;
}

.ui-btn.root[data-aig].Active::before {
  opacity: 0 !important;
}
</style>
