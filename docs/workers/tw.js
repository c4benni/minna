self.addEventListener(
  'message',
  (e) => {
    if (e.data.name == 'timeout') {
      let t = self.setTimeout(() => {
        self.postMessage({
          name: 'timeout',
          timeStamp: e.data.timeStamp,
          data: e.data.data
        })
        self.clearTimeout(t)
        t = 0
      }, e.data.delay)
    }
  },
  { passive: true }
)
