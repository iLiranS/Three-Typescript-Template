import * as THREE from 'three'
import { Scene } from "three"
import Experience from "./Experience"
import Sizes from "./Utils/Sizes"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default class Cmaera {
    experience: Experience
    sizes: Sizes
    scene: Scene
    canvas: HTMLCanvasElement
    instance: THREE.PerspectiveCamera  // feel free to add more - but make sure to update stuff
    controls: OrbitControls

    constructor() {
        // this.experience = experience
        this.experience = Experience.getInstance()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas

        // initiate camera
        this.instance = new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height, 0.1, 100)
        this.instance.position.set(6, 4, 8)
        this.scene.add(this.instance)

        // orbit control
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.enableDamping = true
    }
    // on resize screen
    resizeHandler() {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }
    // on each tick (frame)
    update() {
        this.controls.update()
    }


}