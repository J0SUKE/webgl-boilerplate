import * as THREE from 'three'
import { Position, Size } from '../../types/types'
//@ts-ignore
import vertexShader from '../../assets/shaders/vertex.glsl'
//@ts-ignore
import fragmentShader from '../../assets/shaders/fragment.glsl'

interface MediaProps {
  element: HTMLImageElement
  scene: THREE.Scene
  sizes: Size
  time: number
}

export default class Media {
  element: HTMLImageElement
  scene: THREE.Scene
  //@ts-ignore
  geometry: THREE.PlaneGeometry
  //@ts-ignore
  material: THREE.RawShaderMaterial
  //@ts-ignore
  mesh: THREE.Mesh
  sizes: Size
  //@ts-ignore
  meshDimensions: Size
  //@ts-ignore
  meshPositions: Position
  //@ts-ignore
  elementBounds: DOMRect
  time: number
  currentScroll: number

  constructor({ element, scene, sizes, time }: MediaProps) {
    this.element = element
    this.scene = scene
    this.sizes = sizes
    this.time = time
    this.currentScroll = 0

    this.setBounds()
    this.setMeshDimensions()
    this.createGeometry()
    this.createMaterial()
    this.createMesh()
    this.setMeshPositions()
  }

  createGeometry() {
    this.geometry = new THREE.PlaneGeometry(this.meshDimensions.width, this.meshDimensions.height, 50, 50)
  }
  createMaterial() {
    this.material = new THREE.RawShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: {
          value: this.time,
        },
      },
    })
  }
  createMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.scene.add(this.mesh)
  }
  setMeshDimensions() {
    this.meshDimensions = {
      width: (this.elementBounds.width * this.sizes.width) / window.innerWidth,
      height: (this.elementBounds.height * this.sizes.height) / window.innerHeight,
    }
  }

  setMeshPositions() {
    this.meshPositions = {
      x: (this.elementBounds.left * this.sizes.width) / window.innerWidth,
      y: (-this.elementBounds.top * this.sizes.height) / window.innerHeight,
    }

    this.meshPositions.x -= this.sizes.width / 2
    this.meshPositions.x += this.meshDimensions.width / 2

    this.meshPositions.y -= this.meshDimensions.height / 2
    this.meshPositions.y += this.sizes.height / 2
    this.meshPositions.y -= this.currentScroll

    this.mesh.position.x = this.meshPositions.x
    this.mesh.position.y = this.meshPositions.y
  }

  setBounds() {
    this.elementBounds = this.element.getBoundingClientRect()
  }

  addEventListeners() {}

  render(time: number) {
    this.material.uniforms.uTime.value = time
    this.setMeshPositions()
  }

  updateScroll(scrollY: number) {
    this.currentScroll = (-scrollY * this.sizes.height) / window.innerHeight
  }

  setScrollSpeed(speed: number) {
    this.material.uniforms.uScrollSpeed.value = speed
  }

  onResize() {
    this.scene.remove(this.mesh)
    this.setBounds()
    this.setMeshDimensions()
    this.createGeometry()
    this.createMesh()
    this.setMeshPositions()
  }
}
