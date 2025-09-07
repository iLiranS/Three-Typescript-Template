import * as THREE from 'three'
import Sizes from "./Utils/Sizes"
import Time from "./Utils/Time"
import Camera from './Camera'
import Renderer from './Renderer'
import World from './World/World'

export default class Experience {
     private static instance: Experience
     sizes: Sizes
     time: Time
     canvas: HTMLCanvasElement
     camera: Camera
     scene: THREE.Scene
     renderer: Renderer
     world: World

     constructor() {
          Experience.instance = this // access instance using get funciton and not new() !! it will override

          // Initialize properties
          this.canvas = document.querySelector('canvas') as HTMLCanvasElement
          this.sizes = new Sizes()
          this.time = new Time()
          this.scene = new THREE.Scene()
          this.camera = new Camera() //  uses all of the above so keep it here
          this.renderer = new Renderer() // make it after camera
          this.world = new World()

          // Setup event listeners
          this.sizes.on('resize', () => {
               this.resize()
          })

          this.time.on('tick', () => {
               this.update()
          })
     }
     // get singleton instance - don't use new() !
     public static getInstance(): Experience {
          if (!Experience.instance) {
               Experience.instance = new Experience()
          }
          return Experience.instance
     }

     // make sure to listen to resize and upate only here to avoid sync bugs - you can call inner funcitons with those values.
     resize() {
          this.camera.resizeHandler()
          this.renderer.resizeHandler()
     }

     update() {
          this.camera.update()
          this.renderer.update()
     }
}