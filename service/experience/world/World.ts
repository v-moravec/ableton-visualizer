import * as THREE from 'three'
import Experience from '~/service/experience/Experience'
import Environment from '~/service/experience/world/Environment'
import Resources from '~/service/experience/utils/Resources'
import Cube from '~/service/experience/world/Cube'
import EventEmitter from '~/service/experience/utils/EventEmitter'

export default class World extends EventEmitter {
  experience: Experience
  scene: THREE.Scene
  environment: Environment
  resources: Resources
  ball: Cube
  ball2: Cube
  ball3: Cube

  constructor (experience: Experience) {
    super()

    this.experience = experience
    this.scene = this.experience.scene
    this.resources = this.experience.resources

    // Setup
    this.environment = new Environment(this.experience)
    this.ball = new Cube(this.experience)
    this.ball2 = new Cube(this.experience, 4)
    this.ball2.setPosition(17, 0.5, 3)
    this.ball3 = new Cube(this.experience, 4)
    this.ball3.setPosition(-17, 0.5, 3)

    this.resources.on('ready', () => {
      // If resources are being loaded
    })
  }
}
