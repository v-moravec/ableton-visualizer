import * as THREE from 'three'
import Experience from '~/service/experience/Experience'
import Sizes from '~/service/experience/utils/Sizes'
import Camera from '~/service/experience/Camera'
import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer'
import { UnrealBloomPass} from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass'

export default class Renderer {
  experience: Experience
  canvas: HTMLElement
  sizes: Sizes
  scene: THREE.Scene
  camera: Camera
  instance: THREE.WebGLRenderer
  composer: EffectComposer

  constructor (experience: Experience) {
    this.experience = experience
    this.canvas = this.experience.canvas
    this.sizes = this.experience.sizes
    this.scene = this.experience.scene
    this.camera = this.experience.camera

    this.setInstance()

    const renderScene = new RenderPass( this.scene, this.camera.instance )

    const bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 )
    bloomPass.threshold = 0
    bloomPass.strength = 1
    bloomPass.radius = 1

    this.composer = new EffectComposer(this.instance)
    this.composer.addPass(renderScene)
    this.composer.addPass(bloomPass)
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
    this.composer.render()
    // this.instance.render(this.scene, this.camera.instance)
  }
}
