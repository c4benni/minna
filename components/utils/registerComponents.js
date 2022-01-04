import { camelCase } from '~/components/utils/main'

export default function registerComponents(Vue) {
  const requireComponent = require.context(
    '~/components',
    true,
    /loadingBar|navBar|appBar|uiBtn|uiIcon|uiClickable|appSection|accountCard|homeFaveActions|homeUpdates|pageActions|listActions|detailedButton|rootModal|uiSheet|uiDialog|uiIntersection|sheetHeader|cardsRadio|blankPage|welcomePage|uiInput|uiForm|textDivide\.(vue)$/i
  )

  requireComponent.keys().forEach((fileName) => {
    const componentConfig = requireComponent(fileName)

    const componentName = (val) => {
      val = fileName
        .replace(/^\.\/(\w+\/)?(\w+\W\w+\/)?/, '')
        .replace(/^(\w+\/)?/, '')
        .replace(/\.w+$/, '')
        .replace(/\.vue$/i, '')

      return camelCase(val)
    }

    const name = componentName()

    if (/\.vue$/i.test(name)) {
      return
    }

    Vue.component(name, componentConfig.default || componentConfig)
  })
}
