import * as THREE from 'three'
import Experience from '~/service/experience/Experience'

export default class Environment {
  experience: Experience
  scene: THREE.Scene

  constructor (experience: Experience) {
    this.experience = experience
    this.scene = experience.scene

    /**
     * Light
     */

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
    this.scene.add(ambientLight)

    // const pointLight = new THREE.PointLight(0xffffff, 0.6)
    // pointLight.position.set(0, 9, 0)
    // pointLight.castShadow = true
    // pointLight.shadow.mapSize.width = 2048
    // pointLight.shadow.mapSize.height = 2048
    // pointLight.shadow.camera.far = 18
    // pointLight.shadow.radius = 4
    // this.scene.add(pointLight)

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.5)
    dirLight.position.set(0, 10, 0)
    dirLight.castShadow = true
    dirLight.shadow.mapSize.width = 4096
    dirLight.shadow.mapSize.height = 4096
    dirLight.shadow.camera.near = 0.1
    dirLight.shadow.camera.far = 15
    dirLight.shadow.camera.left = -10
    dirLight.shadow.camera.right = 10
    dirLight.shadow.camera.top = 10
    dirLight.shadow.camera.bottom = -10
    dirLight.shadow.radius = 4
    this.scene.add(dirLight)

    const dirLight2 = new THREE.DirectionalLight(0xffffff, 0.5)
    dirLight2.position.set(0, -10, 0)
    dirLight2.castShadow = true
    dirLight2.shadow.mapSize.width = 4096
    dirLight2.shadow.mapSize.height = 4096
    dirLight2.shadow.camera.near = 0.1
    dirLight2.shadow.camera.far = 15
    dirLight2.shadow.camera.left = -10
    dirLight2.shadow.camera.right = 10
    dirLight2.shadow.camera.top = 10
    dirLight2.shadow.camera.bottom = -10
    dirLight2.shadow.radius = 4
    this.scene.add(dirLight2)

    // const dirLightHelper = new THREE.CameraHelper(pointLight.shadow.camera)
    // this.scene.add(dirLightHelper)
  }
}
