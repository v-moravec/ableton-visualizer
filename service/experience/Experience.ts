import * as THREE from 'three'
import Sizes from '~/service/experience/utils/Sizes'
import Time from '~/service/experience/utils/Time'
import Camera from './Camera'
import Renderer from '~/service/experience/Renderer'
import World from '~/service/experience/world/World'
import Resources from '~/service/experience/utils/Resources'
import { sources } from '~/service/experience/sources'
import {ColorRepresentation} from 'three'
// import {RoomEnvironment} from "three/examples/jsm/environments/RoomEnvironment"

export default class Experience {
  canvas: HTMLElement
  sizes: Sizes
  time: Time
  scene: THREE.Scene
  resources: Resources
  camera: Camera
  renderer: Renderer
  world: World
  noteOn: boolean
  highFreq: number
  lowFreq: number

  constructor () {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.experience = this

    // Setup
    this.sizes = new Sizes()
    this.time = new Time()
    this.noteOn = false
    this.setScene()
    this.resources = new Resources(sources)

    this.sizes.on('resize', () => {
      this.resize()
    })

    this.time.on('tick', () => {
      this.update()
    })

    this.highFreq = 0.1
    this.lowFreq = 0.0001
  }

  setMembers (canvas?: HTMLElement) {
    if (!canvas) return

    this.canvas = canvas

    this.camera = new Camera(this)
    this.renderer = new Renderer(this)
    // const environment = new RoomEnvironment()
    // const pmremGenerator = new THREE.PMREMGenerator( this.renderer.instance );
    // this.scene.environment = pmremGenerator.fromScene( environment ).texture;
    this.world = new World(this)
  }

  resize () {
    this.camera.resize()
    this.renderer.resize()
  }

  update () {
    if(this.noteOn) {
      this.highFreq += 0.001
      this.lowFreq += 0.0001
      if(this.highFreq > 0.2) this.highFreq = 0.2
      if(this.lowFreq > 0.01) this.lowFreq = 0.01
    } else {
      this.highFreq -= 0.002
      this.lowFreq -= 0.0002
      if(this.highFreq < 0.0001) this.highFreq = 0.0001
      if(this.lowFreq < 0.01) this.lowFreq = 0.01
    }

    this.world.ball.makeRoughBall(this.world.ball.modulate(Math.pow(this.lowFreq, 0.8), 0, 1, 0, 8), this.world.ball.modulate(this.highFreq, 0, 1, 0, 4))
    this.world.ball2.makeRoughBall(this.world.ball.modulate(Math.pow(this.lowFreq, 0.8), 0, 1, 0, 8), this.world.ball.modulate(this.highFreq, 0, 1, 0, 4))
    this.world.ball3.makeRoughBall(this.world.ball.modulate(Math.pow(this.lowFreq, 0.8), 0, 1, 0, 8), this.world.ball.modulate(this.highFreq, 0, 1, 0, 4))

    this.world.ball.rotate()
    this.world.ball2.rotate()
    this.world.ball3.rotate()

    this.camera.update()
    this.renderer.update()
    // First we need to render, then update points
    // (otherwise there is a weird lag effect and points are on old frame position)
    // this.raycaster.update()
  }

  setScene () {
    this.scene = new THREE.Scene()
    // this.scene.fog = new THREE.Fog('#fff', 50, 100 )
    this.changeBackground()
  }

  destroy () {
    this.sizes.off('resize')
    this.time.off('tick')

    this.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose()

        for (const key in child.material) {
          const value = child.material[key]
          if (value && typeof value.dispose === 'function') {
            value.dispose()
          }
        }
      }
    })

    this.camera.controls.dispose()
    this.renderer.instance.dispose()
  }

  changeBackground () {

    const colors: ColorRepresentation[] = [ '#0E7C7B', '#17BEBB', '#D4F4DD', '#D62246']

    const index = Math.floor(Math.random() * colors.length)

    const color = colors[index]

    // this.scene.fog = new THREE.Fog(color, 30, 40 )

    this.scene.background = new THREE.Color(color)
  }
}
