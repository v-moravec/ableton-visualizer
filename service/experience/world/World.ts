import * as THREE from 'three'
import Experience from '~/service/experience/Experience'
import Environment from '~/service/experience/world/Environment'
import Resources from '~/service/experience/utils/Resources'
import Ball from '~/service/experience/world/Ball'
import EventEmitter from '~/service/experience/utils/EventEmitter'

export default class World extends EventEmitter {
  experience: Experience
  scene: THREE.Scene
  environment: Environment
  resources: Resources
  ball: Ball
  ball2: Ball
  ball3: Ball

  constructor (experience: Experience) {
    super()

    this.experience = experience
    this.scene = this.experience.scene
    this.resources = this.experience.resources

    // Setup
    this.environment = new Environment(this.experience)
    this.ball = new Ball(this.experience)
    this.ball2 = new Ball(this.experience, 4)
    this.ball2.setPosition(17, 0.5, 3)
    this.ball3 = new Ball(this.experience, 4)
    this.ball3.setPosition(-17, 0.5, 3)

    this.resources.on('ready', () => {
      // If resources are being loaded
    })
  }
}
