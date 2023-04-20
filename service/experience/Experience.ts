import * as THREE from 'three'
import Sizes from '~/service/experience/utils/Sizes'
import Time from '~/service/experience/utils/Time'
import Camera from './Camera'
import Renderer from '~/service/experience/Renderer'
import World from '~/service/experience/world/World'
import Resources from '~/service/experience/utils/Resources'
import { sources } from '~/service/experience/sources'
import {ColorRepresentation} from 'three'
import {BackgroundColors} from '~/service/experience/utils/Colors'
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

  constructor () {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.experience = this

    // Setup
    this.sizes = new Sizes()
    this.time = new Time()
    this.setScene()
    this.resources = new Resources(sources)

    this.sizes.on('resize', () => {
      this.resize()
    })

    this.time.on('tick', () => {
      this.update()
    })
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
    this.world.update()
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

    const colors = BackgroundColors

    const index = Math.floor(Math.random() * colors.length)

    const color = colors[index]

    // this.scene.fog = new THREE.Fog(color, 30, 40 )

    this.scene.background = new THREE.Color(color)
  }
}
