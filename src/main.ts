import Canvas from './classes/Canvas'
import './style.css'

export default class App {
  canvas: Canvas

  constructor() {
    this.canvas = new Canvas()

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

    requestAnimationFrame(this.render.bind(this))
  }
}

new App()
