import EventEmitter from '~/service/experience/utils/EventEmitter'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Stats from 'stats.js'

export default class Time extends EventEmitter {
  start: number
  current: number
  elapsed: number
  delta: number
  stats: Stats

  constructor () {
    super()

    this.stats = new Stats()
    this.stats.showPanel(0)
    this.stats.dom.style.bottom = '0px'
    this.stats.dom.style.top = ''
    if(window.location.hash === '#fps') {
      document.body.append(this.stats.dom)
    }

    // Setup
    this.start = Date.now()
    this.current = this.start
    this.elapsed = 0
    // This is 16 - 60fps - 16ms to tick (there is a bug when this is set to 0 by default)
    this.delta = 16

    // Wait one tick (one frame) - causes the delta = 0 issue
    window.requestAnimationFrame(() => {
      this.tick()
    })
  }

  tick () {
    this.stats.begin()
    const currentTime = Date.now()
    this.delta = currentTime - this.current
    this.current = currentTime
    this.elapsed = this.current - this.start

    this.trigger('tick')

    window.requestAnimationFrame(() => {
      this.stats.end()
      this.tick()
    })
  }
}
