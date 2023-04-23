import * as THREE from 'three'
import Experience from '~/service/experience/Experience'
import Environment from '~/service/experience/world/Environment'
import Resources from '~/service/experience/utils/Resources'
import Ball from '~/service/experience/world/Ball'
import EventEmitter from '~/service/experience/utils/EventEmitter'
import Plane from '~/service/experience/world/Plane'

export default class World extends EventEmitter {
  experience: Experience
  scene: THREE.Scene
  environment: Environment
  resources: Resources
  ball: Ball
  ball2: Ball
  ball3: Ball
  planeTop: Plane
  planeBottom: Plane
  noteOnMelody: boolean
  noteOnDrums: boolean
  noteOnRhytm: boolean
  highFreq: number
  lowFreq: number

  constructor (experience: Experience) {
    super()

    this.experience = experience
    this.scene = this.experience.scene
    this.resources = this.experience.resources

    // Setup
    this.environment = new Environment(this.experience)
    this.ball = new Ball(this.experience)
    this.ball2 = new Ball(this.experience, 4, 10)
    this.ball2.setPosition(17, 0.5, 3)
    this.ball3 = new Ball(this.experience, 4, 10)
    this.ball3.setPosition(-17, 0.5, 3)

    this.planeTop = new Plane(this.experience, 30)
    this.planeBottom = new Plane(this.experience, -30)

    this.resources.on('ready', () => {
      // If resources are being loaded
    })

    this.noteOnMelody = false
    this.noteOnDrums = false
    this.noteOnRhytm = false
    this.highFreq = 0.1
    this.lowFreq = 0.0001
  }

  update () {
    if(this.noteOnMelody) {
      this.ball.makeRoughBall(
        this.modulate(Math.pow(0.0001, 0.8), 0, 1, 0, 8),
        this.modulate(0.1, 0, 1, 0, 4)
      )
    } else {
      this.ball.makeRoughBall(
        this.modulate(Math.pow(0, 0.8), 0, 1, 0, 8),
        this.modulate(0, 0, 1, 0, 4)
      )
    }

    if(this.noteOnRhytm) {
      this.highFreq += 0.001
      this.lowFreq += 0.0001
      if(this.highFreq > 0.2) this.highFreq = 0.2
      if(this.lowFreq > 0.01) this.lowFreq = 0.01
      this.planeBottom.makeRoughGround(this.modulate(this.lowFreq * 4, 0, 1, 0, 4))
      this.planeTop.makeRoughGround(this.modulate(this.highFreq, 0, 1, 0, 4))
    } else {
      this.highFreq -= 0.001
      this.lowFreq -= 0.0001
      if(this.highFreq < 0.0001) this.highFreq = 0.0001
      if(this.lowFreq < 0.01) this.lowFreq = 0.01
      this.planeBottom.makeRoughGround(this.modulate(0, 0, 1, 0, 4))
      this.planeTop.makeRoughGround(this.modulate(0, 0, 1, 0, 4))
    }

    if(this.noteOnDrums) {
      this.ball2.makeRoughBall(
        this.modulate(Math.pow(0.0001, 0.8), 0, 1, 0, 8),
        this.modulate(0.1, 0, 1, 0, 4),
        3
      )
      this.ball3.makeRoughBall(
        this.modulate(Math.pow(0.0001, 0.8), 0, 1, 0, 8),
        this.modulate(0.1, 0, 1, 0, 4),
        3
      )
    } else {
      this.ball2.makeRoughBall(
        this.modulate(Math.pow(0, 0.8), 0, 1, 0, 8),
        this.modulate(0, 0, 1, 0, 4)
      )
      this.ball3.makeRoughBall(
        this.modulate(Math.pow(0, 0.8), 0, 1, 0, 8),
        this.modulate(0, 0, 1, 0, 4)
      )
    }
    // this.ball.makeRoughBall(this.modulate(Math.pow(this.lowFreq, 0.8), 0, 1, 0, 8), this.modulate(this.highFreq, 0, 1, 0, 4))

    this.ball.rotate()
    this.ball2.rotate()
    this.ball3.rotate()
  }

  fractionate(val: number, minVal: number, maxVal: number) {
    return (val - minVal)/(maxVal - minVal);
  }

  modulate(val: number, minVal: number, maxVal: number, outMin: number, outMax: number) {
    const fr = this.fractionate(val, minVal, maxVal);
    const delta = outMax - outMin;
    return outMin + (fr * delta);
  }

  avg(arr: number[]){
    const total = arr.reduce(function(sum, b) { return sum + b; });
    return (total / arr.length);
  }

  max(arr: number[]){
    return arr.reduce(function(a, b){ return Math.max(a, b); })
  }
}
