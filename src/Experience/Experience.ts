import * as THREE from 'three'
import Sizes from "./Utils/Sizes"
import Time from "./Utils/Time"
import Camera from './Camera'
import Renderer from './Renderer'
import World from './World/World'
import Resources from './Utils/Resources'
import { sources } from './sources'
import Debug from './Utils/Debug'


export default class Experience {
     private static instance: Experience
     sizes: Sizes
     time: Time
     canvas: HTMLCanvasElement
     camera: Camera
     scene: THREE.Scene
     renderer: Renderer
     world: World
     resources: Resources
     debug: Debug

     constructor() {
          Experience.instance = this // access instance using get funciton and not new() !! it will override

          // Initialize properties
          this.debug = new Debug()
          this.canvas = document.querySelector('canvas') as HTMLCanvasElement
          this.sizes = new Sizes()
          this.time = new Time()
          this.scene = new THREE.Scene()
          this.camera = new Camera() //  uses all of the above so keep it here
          this.renderer = new Renderer() // make it after camera
          this.resources = new Resources(sources) // keep before world !
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
          this.world.update() // animation related for meshes in the world
          this.renderer.update()

     }
     // this destroy is not 100% because there are nested things and 3rd part usage like post processing.
     destroy() {
          this.sizes.off('resize') // remove resize listener
          this.time.off('tick') // remove tick listener

          this.scene.traverse((child) => {
               // Test if it's a mesh
               if (child instanceof THREE.Mesh) {
                    child.geometry.dispose()
                    // Loop through the material properties
                    for (const key in child.material) {
                         const value = child.material[key]
                         // Test if there is a dispose function
                         if (value && typeof value.dispose === 'function') {
                              value.dispose()
                         }
                    }
               }
          })
          this.camera.controls.dispose()
          this.renderer.instance.dispose()
          if (this.debug.ui) this.debug.ui.destroy()
     }
}