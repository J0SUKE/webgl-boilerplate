import * as THREE from 'three'
import Media from './Media'

export default class Canvas {
  element: HTMLCanvasElement
  //@ts-ignore
  scene: THREE.Scene
  //@ts-ignore
  camera: THREE.PerspectiveCamera
  //@ts-ignore
  renderer: THREE.WebGLRenderer
  //@ts-ignore
  imagesNodes: HTMLImageElement[]
  //@ts-ignore
  medias: Media[]
  //@ts-ignore
  sizes: Size
  time: number
  //@ts-ignore
  clock: THREE.Clock
  //@ts-ignore
  raycaster: THREE.Raycaster
  //@ts-ignore
  mouse: THREE.Vector2

  constructor() {
    this.element = document.getElementById('webgl') as HTMLCanvasElement
    this.time = 0
    this.createClock()
    this.createScene()
    this.createCamera()
    this.createRenderer()
    this.setSizes()
    this.createMedias()
    this.createRayCaster()
    this.render()
  }

  createScene() {
    this.scene = new THREE.Scene()
  }

  createCamera() {
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
    this.scene.add(this.camera)
    this.camera.position.z = 1
  }

  createRenderer() {
    this.renderer = new THREE.WebGLRenderer({ canvas: this.element, alpha: true })
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.render(this.scene, this.camera)
    this.renderer.setPixelRatio(Math.min(2, window.devicePixelRatio))
  }

  createMedias() {
    this.imagesNodes = [...(document.querySelectorAll('img') as unknown as HTMLImageElement[])]

    this.medias = this.imagesNodes.map((image) => {
      return new Media({ element: image, scene: this.scene, sizes: this.sizes, time: this.time })
    })
  }

  setSizes() {
    let fov = this.camera.fov * (Math.PI / 180)
    let height = this.camera.position.z * Math.tan(fov / 2) * 2
    let width = height * this.camera.aspect

    this.sizes = {
      width: width,
      height: height,
    }
  }

  createClock() {
    this.clock = new THREE.Clock()
  }

  render() {
    this.time = this.clock.getElapsedTime()

    this.medias.forEach((media) => {
      media.render(this.time)
    })

    this.renderer.render(this.scene, this.camera)
  }

  createRayCaster() {
    this.raycaster = new THREE.Raycaster()
    this.mouse = new THREE.Vector2()
  }

  // onMouseMove(event: MouseEvent) {
  //   this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1
  //   this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

  //   this.raycaster.setFromCamera(this.mouse, this.camera)
  //   const intersects = this.raycaster.intersectObjects(this.scene.children)
  //   const target = intersects[0]
  //   if (target && 'material' in target.object) {
  //     const targetMesh = intersects[0].object as THREE.Mesh
  //     ;(targetMesh.material as THREE.RawShaderMaterial).uniforms.uHover.value = target.uv
  //   }
  // }

  addEventListeners() {
    //window.addEventListener('mousemove', this.onMouseMove.bind(this))
    window.addEventListener('resize', this.onResize.bind(this))
    if (this.medias) {
      this.medias.forEach((media) => {
        media.addEventListeners()
      })
    }
  }

  onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.setSizes()

    this.renderer.setSize(window.innerWidth, window.innerHeight)

    this.medias.forEach((media) => {
      media.onResize()
    })
  }
}
