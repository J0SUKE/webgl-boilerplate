import Canvas from './classes/Canvas'
import './style.css'
import Scroll from './classes/Scroll'

export default class App {
  canvas: Canvas
  scroll: Scroll

  constructor() {
    this.scroll = new Scroll()
    this.canvas = new Canvas({ scroll: this.scroll })

    this.addEventListeners()
    this.render()
  }

  addEventListeners() {
    if (this.canvas && this.canvas.addEventListeners) {
      this.canvas.addEventListeners()
    }
  }

  render() {
    if (this.canvas && this.canvas.render) {
      this.canvas.render()
    }

    this.scroll.render()

    requestAnimationFrame(this.render.bind(this))
  }
}

new App()
