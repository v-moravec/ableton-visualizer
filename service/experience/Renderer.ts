import * as THREE from 'three'
import Experience from '~/service/experience/Experience'
import Sizes from '~/service/experience/utils/Sizes'
import Camera from '~/service/experience/Camera'

export default class Renderer {
  experience: Experience
  canvas: HTMLElement
  sizes: Sizes
  scene: THREE.Scene
  camera: Camera
  instance: THREE.WebGLRenderer

  constructor (experience: Experience) {
    this.experience = experience
    this.canvas = this.experience.canvas
    this.sizes = this.experience.sizes
    this.scene = this.experience.scene
    this.camera = this.experience.camera

    this.setInstance()
  }

  setInstance () {
    this.instance = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      preserveDrawingBuffer: true
    })
    this.instance.shadowMap.enabled = true
    this.instance.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.instance.outputEncoding = THREE.sRGBEncoding
    this.instance.setSize(this.sizes.width, this.sizes.height)
    this.instance.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  }

  resize () {
    this.instance.setSize(this.sizes.width, this.sizes.height)
    this.instance.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  }

  update () {
    this.instance.render(this.scene, this.camera.instance)
  }
}
