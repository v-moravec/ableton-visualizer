import Experience from '~/service/experience/Experience'
import Resources from '~/service/experience/utils/Resources'
import * as THREE from 'three'
import {SimplexNoise} from 'three/examples/jsm/math/SimplexNoise'
import {ColorRepresentation} from 'three'

export default class Cube {
  experience: Experience
  scene: THREE.Scene
  resources: Resources
  private geometry: THREE.IcosahedronGeometry
  private material: THREE.MeshLambertMaterial
  private mesh: THREE.Mesh<THREE.IcosahedronGeometry, THREE.Material>
  private noise: SimplexNoise

  constructor (experience: Experience) {
    this.experience = experience
    this.scene = this.experience.scene
    this.resources = this.experience.resources

    this.setGeometry()
    this.setMaterial()
    this.setMesh()

    this.noise = new SimplexNoise()
    this.makeRoughBall(this.modulate(Math.pow(0.001, 0.8), 0, 1, 0, 8), this.modulate(0.1, 0, 1, 0, 4))
    this.changeColor()


    this.scene.add(this.mesh)
  }

  setGeometry () {
    this.geometry = new THREE.IcosahedronGeometry(10, 4)
  }

  setMaterial () {
    this.material = new THREE.MeshLambertMaterial({
      color: 0xff00ee
    })
    // this.material.wireframeLinewidth = 10
    // this.material.wireframe = true
    // this.material.side = THREE.BackSide
  }

  setMesh () {
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.mesh.receiveShadow = true
    this.mesh.position.y = 0.5
    this.mesh.rotation.y = Math.PI / 4
    this.mesh.rotation.x = Math.PI / 4
  }

  rotate() {
    this.mesh.rotation.y += 0.005
  }

  changeColor() {
    const colors: ColorRepresentation[] = [ '#0E7C7B', '#17BEBB', '#D4F4DD', '#D62246']

    const index = Math.floor(Math.random() * colors.length)

    const color = colors[index]

    this.material.color = new THREE.Color(color)
  }

  makeRoughBall(bassFr: number, treFr: number) {
    const noise = this.noise

    const positionAttribute = this.mesh.geometry.getAttribute('position')
    const localVertex = new THREE.Vector3()

    for ( let vertexIndex = 0; vertexIndex < positionAttribute.count; vertexIndex++ ) {
      localVertex.fromBufferAttribute(positionAttribute, vertexIndex)

      const offset = this.mesh.geometry.parameters.radius
      const amp = 7
      const time = window.performance.now()
      const rf = 0.00001
      localVertex.normalize()
      const distance = (offset + bassFr ) + noise.noise3d(localVertex.x + time *rf*7, localVertex.y +  time*rf*8, localVertex.z + time*rf*9) * amp * treFr
      localVertex.multiplyScalar(distance)

      positionAttribute.array[3 * vertexIndex] = localVertex.x
      positionAttribute.array[3 * vertexIndex + 1] = localVertex.y
      positionAttribute.array[3 * vertexIndex + 2] = localVertex.z
    }

    // mesh.geometry.verticesNeedUpdate = true
    // mesh.geometry.normalsNeedUpdate = true
    this.mesh.geometry.computeVertexNormals()
    this.mesh.matrixWorldNeedsUpdate = true
    this.mesh.geometry.attributes.position.needsUpdate = true
    positionAttribute.needsUpdate = true
    // this.mesh.geometry.computeFaceNormals()
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
