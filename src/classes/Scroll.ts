const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b

export default class Scroll {
  DOM: {
    main: HTMLDivElement
    scollable: HTMLDivElement
  }
  docSroll: number
  scrollToRender: number
  current: number
  speed: number
  ease: number
  speedTarget: number
  direction: number
  //@ts-ignore
  shouldRender: boolean

  constructor() {
    this.DOM = {
      main: document.querySelector('main') as HTMLDivElement,
      scollable: document.querySelector('div[data-scroll]') as HTMLDivElement,
    }

    this.docSroll = 0
    this.scrollToRender = 0
    this.current = 0
    this.speed = 0
    this.ease = 0.1
    this.direction = 1
    this.speedTarget = 0

    this.setSize()
    this.getScroll()
    this.init()
    this.style()
    this.initEvents()
  }

  setSize() {
    document.body.style.height = `${this.DOM.scollable.scrollHeight}px`
  }
  getScroll() {
    this.docSroll = window.pageYOffset || document.documentElement.scrollTop
    return this.docSroll
  }
  init() {
    // for (const key of this.renderedStyles) {
    //   this.current = this.scrollToRender = this.getScroll()
    // }

    this.setPosition()
    this.shouldRender = true
  }
  style() {
    this.DOM.main.style.position = 'fixed'
    this.DOM.main.style.width = this.DOM.main.style.height = '100%'
    this.DOM.main.style.top = this.DOM.main.style.left = '0%'
    this.DOM.main.style.overflow = 'hidden'
  }
  initEvents() {
    window.onbeforeunload = () => {
      window.scrollTo(0, 0)
    }

    window.addEventListener('resize', this.setSize.bind(this))
    window.addEventListener('scroll', this.getScroll.bind(this))
  }

  setPosition() {
    if (Math.round(this.scrollToRender) !== Math.round(this.current) || this.scrollToRender < 10) {
      this.DOM.scollable.style.transform = `translate3d(0,${-this.scrollToRender}px,0)`
    }
  }

  render() {
    this.speed = Math.min(Math.abs(this.current - this.scrollToRender), 200) / 200
    this.speedTarget += (this.speed - this.speedTarget) * 0.2
    this.current > this.scrollToRender ? (this.direction = 1) : (this.direction = -1)
    this.current = this.getScroll()
    this.scrollToRender = lerp(this.scrollToRender, this.current, this.ease)

    this.setPosition()
  }
}
