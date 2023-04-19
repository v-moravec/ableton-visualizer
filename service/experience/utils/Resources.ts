import EventEmitter from '~/service/experience/utils/EventEmitter'
import { Source } from '~/service/experience/sources'
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { Texture, TextureLoader } from 'three'
import * as THREE from 'three';

export default class Resources extends EventEmitter {
  sources: Source[]
  models: { [name: string]: GLTF }
  textures: { [name: string]: Texture }
  toLoad: number
  loaded: number
  loaders: {
    gltfLoader: GLTFLoader,
    textureLoader: TextureLoader
  }

  constructor (sources: Source[]) {
    super()

    // Options
    this.sources = sources

    // Setup
    this.models = {}
    this.textures = {}
    this.toLoad = this.sources.length
    this.loaded = 0

    this.setLoaders()
    this.startLoading()
  }

  setLoaders () {
    this.loaders = {
      gltfLoader: new GLTFLoader(),
      textureLoader: new TextureLoader()
    }
  }

  startLoading () {
    this.sources.forEach((source: Source) => {
      if (source.type === 'gltfModel') {
        this.loaders.gltfLoader.load(
          source.path,
          (file) => {
            this.modelLoaded(source, file)
          }
        )
      } else if (source.type === 'texture') {
        this.loaders.textureLoader.load(
          source.path,
          (texture) => {
            texture.wrapS = THREE.RepeatWrapping
            texture.wrapT = THREE.RepeatWrapping
            texture.name = source.name
            this.textureLoaded(source, texture)
          }
        )
      }
    })
  }

  modelLoaded (source: Source, file: GLTF) {
    this.models[source.name] = file
    this.loaded++

    if (this.loaded === this.toLoad) {
      this.trigger('ready')
    }
  }

  textureLoaded (source: Source, texture: Texture) {
    this.textures[source.name] = texture
    this.loaded++

    if (this.loaded === this.toLoad) {
      this.trigger('ready')
    }
  }
}
