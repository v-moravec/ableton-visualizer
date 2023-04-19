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
  private material: THREE.MeshStandardMaterial
  private wfMaterial: THREE.MeshBasicMaterial
  private mesh: THREE.Mesh<THREE.IcosahedronGeometry, THREE.Material>
  private wfMesh: THREE.Mesh<THREE.IcosahedronGeometry, THREE.Material>
  private noise: SimplexNoise

  constructor (experience: Experience, radius = 10) {
    this.experience = experience
    this.scene = this.experience.scene
    this.resources = this.experience.resources

    this.setGeometry(radius)
    this.setMaterial()
    this.setMesh()

    this.noise = new SimplexNoise()
    this.makeRoughBall(this.modulate(Math.pow(0.001, 0.8), 0, 1, 0, 8), this.modulate(0.1, 0, 1, 0, 4))
    this.changeColor()

    this.scene.add(this.mesh)
    this.scene.add(this.wfMesh)
  }

  setGeometry (radius = 10) {
    this.geometry = new THREE.IcosahedronGeometry(radius, 20)
  }

  setMaterial () {
    this.material = new THREE.MeshStandardMaterial({
      color: 0xff00ee
    })

    this.wfMaterial = new THREE.MeshBasicMaterial({
      color: '#fff',
      wireframe: true,
      transparent: true
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

    this.wfMesh = new THREE.Mesh(this.geometry, this.wfMaterial)
    this.wfMesh.receiveShadow = true
    this.wfMesh.position.y = 0.5
    this.wfMesh.rotation.y = Math.PI / 4
    this.wfMesh.rotation.x = Math.PI / 4
  }

  setPosition (x: number, y: number, z: number) {
    this.mesh.position.set(x, y, z)
    this.wfMesh.position.set(x, y, z)
  }

  rotate() {
    const rotation = 0.005

    this.mesh.rotation.y += rotation
    this.wfMesh.rotation.y += rotation
  }

  changeColor() {
    const colors: ColorRepresentation[] = [ '#0E7C7B', '#17BEBB', '#D4F4DD', '#D62246']

    const index = Math.floor(Math.random() * colors.length)

    let color

    console.log((index + 1) % colors.length)

    if('#' + this.material.color.getHexString().toUpperCase() !== colors[index]) {
      color = colors[index]
    } else {
      console.log('WTF')
      color = colors[(index + 1) % colors.length]
    }

    this.material.color = new THREE.Color(color)
    this.wfMaterial.color = new THREE.Color(color)
  }

  makeRoughBall(bassFr: number, treFr: number) {
    const noise = this.noise

    const positionAttribute = this.mesh.geometry.getAttribute('position')
    const positionWfAttribute = this.wfMesh.geometry.getAttribute('position')
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

      positionWfAttribute.array[3 * vertexIndex] = localVertex.x
      positionWfAttribute.array[3 * vertexIndex + 1] = localVertex.y
      positionWfAttribute.array[3 * vertexIndex + 2] = localVertex.z
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
