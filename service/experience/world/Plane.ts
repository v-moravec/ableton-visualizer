import * as THREE from 'three'
import Experience from '~/service/experience/Experience'
import Resources from '~/service/experience/utils/Resources'
import {SimplexNoise} from 'three/examples/jsm/math/SimplexNoise'

export default class {
  experience: Experience
  scene: THREE.Scene
  resources: Resources
  private geometry
  private material
  private mesh: THREE.Mesh
  private noise: SimplexNoise

  constructor(experience: Experience, position: number) {
    this.experience = experience
    this.scene = this.experience.scene
    this.resources = this.experience.resources

    this.noise = new SimplexNoise()

    this.geometry = new THREE.PlaneGeometry(400, 400, 20, 20);
    this.material = new THREE.MeshLambertMaterial({
      color: '#ffffff',
      side: THREE.DoubleSide,
      wireframe: true
    })

    this.setMesh(position)
  }

  setMesh (position: number) {
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.mesh.rotation.x = -0.5 * Math.PI
    this.mesh.position.set(0, position, 0)
    this.scene.add(this.mesh)
  }

  makeRoughGround(distortionFr: number) {
    const noise = this.noise

    const positionAttribute = this.mesh.geometry.getAttribute('position')
    const localVertex = new THREE.Vector3()

    for ( let vertexIndex = 0; vertexIndex < positionAttribute.count; vertexIndex++ ) {
      localVertex.fromBufferAttribute(positionAttribute, vertexIndex)

      const amp = 20
      const time = Date.now()
      const distance = (noise.noise(localVertex.x + time * 0.0003, localVertex.y + time * 0.0001)) * distortionFr * amp
      localVertex.z = distance

      positionAttribute.array[3 * vertexIndex + 2] = localVertex.z
    }

    this.mesh.geometry.computeVertexNormals()
    this.mesh.matrixWorldNeedsUpdate = true
    this.mesh.geometry.attributes.position.needsUpdate = true
    positionAttribute.needsUpdate = true
  }
}
