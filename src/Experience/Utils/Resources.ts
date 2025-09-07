import { sourceType } from "../sources";
import EventEmitter from "./EventEmitter";
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export default class Resources extends EventEmitter {
    sources: sourceType[]
    items: any
    toLoad: number
    loaded: number
    loaders: any // flex

    constructor(sources: sourceType[]) {
        super()
        this.sources = sources

        // Setup
        this.items = []
        this.toLoad = sources.length
        this.loaded = 0

        this.setLoaders()
        this.startLoading()
    }
    setLoaders() {
        this.loaders = {}
        this.loaders.gltfLoader = new GLTFLoader()
        this.loaders.textureLoader = new THREE.TextureLoader()
        this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader()
    }
    startLoading() {
        for (const source of this.sources) {
            switch (source.type) {
                case "gltfModel":
                    this.loaders.gltfLoader.load(source.path, (file: any) => this.sourceLoaded(source, file))
                    break
                case "cubeTexture":
                    this.loaders.cubeTextureLoader.load(source.path, (file: any) => this.sourceLoaded(source, file))
                    break
                case "texture":
                    this.loaders.textureLoader.load(source.path, (file: any) => this.sourceLoaded(source, file))
                    break
                default:
                    console.error("Unknown source type toload")
            }

        }
    }
    sourceLoaded(source: sourceType, file: any) {
        this.items[source.name] = file
        this.loaded++
        if (this.loaded === this.toLoad) this.trigger("ready") // finished loading sources
    }
}