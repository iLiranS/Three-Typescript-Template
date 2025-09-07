import * as THREE from 'three'
import { Scene } from "three";
import Experience from "./Experience";
import Sizes from "./Utils/Sizes";
import Cmaera from "./Camera";

export default class Renderer {
    experience: Experience
    canvas: HTMLCanvasElement
    sizes: Sizes
    scene: Scene
    camera: Cmaera
    instance: THREE.WebGLRenderer


    constructor() {
        this.experience = Experience.getInstance()
        this.canvas = this.experience.canvas
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.camera = this.experience.camera
        // create an instance
        this.instance = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true })
        this.initianiteInstance()

    }
    initianiteInstance() {
        this.instance.toneMapping = THREE.CineonToneMapping
        this.instance.toneMappingExposure = 1.75
        this.instance.shadowMap.enabled = true
        this.instance.shadowMap.type = THREE.PCFSoftShadowMap
        this.instance.setClearColor('#211d20')
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(this.sizes.pixelRatio)
    }
    resizeHandler() {
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(this.sizes.pixelRatio)
    }
    update() {
        this.instance.render(this.scene, this.camera.instance)
    }
}