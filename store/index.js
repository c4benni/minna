import Vue from 'vue'
import { getObjectPath } from '~/components/utils/main'

export const state = () => ({
  notificationClicked: false,
  user: null,
  siginingIn: false,
  randomImageId: 30,
  accounts: [
    {
      cardType: '4',
      balance: '2,868.80',
      status: 'Active',
      accountNumber: '2359201183',
      tier: 'Tier 3 savings account'
    },

    {
      cardType: '3',
      balance: '9,268.80',
      status: 'Active',
      accountNumber: '24931939401',
      tier: 'Tier 5 current account'
    },

    {
      cardType: '1',
      balance: '1,568.00',
      status: 'Active',
      accountNumber: '39194586932',
      tier: 'Tier 1 savings account'
    },
    {
      cardType: '2',
      balance: '273.65',
      status: 'Inactive',
      accountNumber: '295582910',
      tier: 'Tier 5 current account'
    }
  ],
  selectedAccount: 0,
  username: 'User',
  showPrice: true,
  headerText: '',
  idbUpdateStamp: null,
  vectorIcons: {},

  rootModal: {
    tag: 'ui-sheet',
    active: false,
    meta: {
      uid: null
    },
    transitionState: ''
  },
  searchTransitionState: '',
  searchFocused: false,
  // addNuxtKeyForAddToBag: null,
  // styleEl: null,
  // htmlHead: null,
  // scrolling: false,
  // savedAnimations: {
  //   allAnimClasses: [],
  //   allAnimText: '',
  //   springs: {
  //     // allAnimClasses: [],
  //     // allAnimText: "",
  //   },
  //   springDurations: {}
  // },

  pageVisible: true,
  isTouchDevice: null,
  isStrictTouchDevice: null,
  beforeCreateCalled: false,
  // trackRoutes: {},
  barsHeight: {
    appBar: '48px',
    navBar: '56px'
  },
  breakpoints: {},
  // appLoaded: false,
  showPageLoading: false,
  loadedComponents: {},

  fetched: {
    components: {},
    pages: {}
  },
  // routeToSavedPage: false,
  // styles: [],

  greeting: '',

  // footerIntersection: { entries: {} },
  pageTransition: '',
  pageTransitionState: 'beforeEnter',

  vmodel: {}
})

export const mutations = {
  // SAVED_ANIMATIONS(s, p) {
  //   let root = s.savedAnimations

  //   const className = p.value.className

  //   const text = p.value.text

  //   const allAnimClasses = root.allAnimClasses

  //   if (p.action == 'updateRoot') {
  //     if (process.client) {
  //       if (!allAnimClasses.includes(className)) {
  //         allAnimClasses.push(className)

  //         return (document.getElementById(
  //           'ui-anim-styles'
  //         ).innerHTML += ` ${text}`)

  //         // return (root.allAnimText += `${root.allAnimText ? " " : ""}${text}`);
  //       }
  //       root = 0
  //       return
  //     } else {
  //       root = 0
  //       return
  //     }
  //   }

  //   if (p.action == 'updateSpringActive') {
  //     let springRoot = root.springs

  //     // const allAnimClasses = springRoot.allAnimClasses;

  //     // const savedAnim = allAnimClasses.includes(className);

  //     // if (savedAnim) {
  //     //   return console.log("saved!!!");
  //     // }

  //     let animName = springRoot?.[p.name] || (springRoot[p.name] = {})

  //     let direction = p.direction

  //     let animDir = animName?.[direction] || (animName[direction] = {})

  //     let animKey = p.key

  //     let animPath = animDir?.[animKey] || (animDir[animKey] = {})

  //     if (animPath) {
  //       // root.allAnimText += ` ${text}`;

  //       document.getElementById('ui-anim-styles').innerHTML += ` ${text}`

  //       allAnimClasses.push(className)

  //       if (!animPath[direction]) {
  //         animPath[direction] = { className, text }
  //       }

  //       const duration = p.value.duration || 0

  //       root.springDurations[animKey] = duration
  //     }

  //     animName = 0
  //     direction = 0
  //     animDir = 0
  //     animKey = 0
  //     animPath = 0
  //     springRoot = 0
  //     return
  //   }

  //   let animName = p.animName

  //   let path =
  //     root?.[animName] ||
  //     (root[animName] = {
  //       enter: {},
  //       leave: {}
  //     })

  //   let value = p.value

  //   Object.assign(path.enter, { ...path.enter, ...value.enter })
  //   Object.assign(path.leave, { ...path.leave, ...value.leave })

  //   path = 0
  //   value = 0
  //   root = 0
  //   animName = 0
  // },

  // TRACK_ROUTES(s, p) {
  //   const pathName = (p.path || p.name)
  //     ?.replace(/^index$/, "shop")
  //     .toLowerCase();

  //   // if (!/-/i.test(pathName)) {
  //   //   pathName = `${pathName}`;
  //   // }

  //   const path = s.trackRoutes[pathName];

  //   if (!path) {
  //     return;
  //   }

  //   if (/^scroll/i.test(p.action)) {
  //     path.scrollPosition = p.value;
  //   }

  //   if (p.action == "push") {
  //     const valueIsTheLastItem = path.history?.slice(-1)[0] == p.value;

  //     !valueIsTheLastItem && path.history?.push?.(p.value);
  //   }

  //   if (p.action == "splice") {
  //     path.history = [...path.history].filter((x) => x != p.value);
  //   }
  // },

  FETCHED(s, p) {
    const root = s.fetched
    const path = p.path
    const value = p.value
    const oldValue = root?.[path]

    if (oldValue && value) {
      Vue.set(root, path, [...new Set([...oldValue, value])])
    }
  },

  // ANIMATIONS(s, p) {
  //   const findValue = s.animations.find((x) => x.key == p.value.key);

  //   if (/add|put/i.test(p.action)) {
  //     if (!findValue) {
  //       Vue.set(s, "animations", [...s.animations, { ...p.value }]);
  //     }
  //   }

  //   if (/delete|remove/i.test(p.action)) {
  //     if (!findValue) {
  //       Vue.set(
  //         s,
  //         "animations",
  //         [...s.animations].filter((x) => {
  //           const IDs = [p.value].flat(Infinity).map((x) => x.key);

  //           return !IDs.includes(x.key);
  //         })
  //       );
  //     }
  //   }
  // },

  UPDATE_(s, p) {
    // if (
    //   (s?.name == "sleep" ||
    //     s?.path == "sleep" ||
    //     s?.name == "springWorker" ||
    //     s?.path == "springWorker" ||
    //     s?.name == "uiTransitionWorker" ||
    //     s?.path == "uiTransitionWorker" ||
    //     s?.name == "worker" ||
    //     s?.path == "worker") &&
    //   p.caller != "appMounted"
    // ) {
    //   return;
    // }

    let root = getObjectPath({ obj: s, path: `${p.innerPath}` })
    const path = p?.name || p?.path
    let value = p.value

    // const pathExists = path in root;

    // if (!pathExists) {
    //   throw new TypeError(`${path} is an undefined path`);
    // }

    // root[path] = value

    if (typeof value == 'undefined') {
      Vue.delete(root, path)
    } else {
      Vue.set(root, path, value)
    }

    root = 0

    value = 0
  },

  // PAGE_TRANSITION(s, p) {
  //   Vue.set(s, "pageTransition", p);
  // },

  // CONTAINER(s, p) {
  //   Vue.set(s.containerTransition, p.path, p.value);
  // },

  V_MODEL(s, p) {
    const innerPath = getObjectPath({
      obj: s.vmodel,
      path: p.innerPath
    })

    Vue.set(
      innerPath,
      p.path,
      p.value == 'toggle' ? !innerPath[p.path] : p.value
    )
  }

  // ROOT_BANNER(s, p) {
  //   Vue.set(s.rootBanner, p.path, p.value);
  // },

  // PREFRENCE(s, p) {
  //   Vue.set(s.userPreference, p.path, p.value);
  // },

  // PARALLAX(s, p) {
  //   s.parallax_px = p;
  // },
}

export const getters = {
  pageEntered(s) {
    return /afterEnter/i.test(s.pageTransitionState)
  }
}

// export const actions = {
//   createUser(context) {

//   }
// }
