import * as THREE from 'three'
import Experience from '~/service/experience/Experience'
import Sizes from '~/service/experience/utils/Sizes'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import {gsap} from 'gsap'

export default class Camera {
  experience: Experience
  sizes: Sizes
  scene: THREE.Scene
  canvas: HTMLElement
  instance: THREE.PerspectiveCamera
  controls: OrbitControls
  tl: any

  constructor (experience: Experience) {
    this.experience = experience
    this.sizes = this.experience.sizes
    this.scene = this.experience.scene
    this.canvas = this.experience.canvas

    gsap.ticker.fps(300)
    this.tl = gsap.timeline()

    this.setInstance()
    this.setOrbitControls()
  }

  setInstance () {
    this.instance = new THREE.PerspectiveCamera(
      46,
      this.sizes.width / this.sizes.height,
      0.01,
      1000
    )
    this.instance.position.set(0, 0, 40)
    this.scene.add(this.instance)
  }

  setOrbitControls () {
    this.controls = new OrbitControls(this.instance, this.canvas)
    this.controls.enableDamping = true
    this.controls.dampingFactor = 0.2
    // this.controls.maxDistance = 9.8
    this.controls.minDistance = 0.5
    this.controls.target.set(0, 0.5, 0)
    // this.controls.autoRotate = true
    this.controls.saveState()
  }

  resize () {
    this.instance.aspect = this.sizes.width / this.sizes.height
    this.instance.updateProjectionMatrix()
  }

  update () {
    this.controls.update()
  }

  killTimeline () {
    // this.tl.kill()
    this.tl.pause()
  }

  reset () {
    this.tl = gsap.timeline()

    // this.controls.reset()
    this.tl.add('s').to(this.instance.position, {
      duration: 1,
      x: 0,
      y: 2,
      z: 4.5,
      ease: 'power2'
    }, 's').to(this.controls.target, {
      duration: 1,
      x: 0,
      y: 0.5,
      z: 0,
      ease: 'power2'
    }, 's')
  }
}
