import Experience from "../Experience";
import * as THREE from 'three'
import Resources from "../Utils/Resources";
import Time from "../Utils/Time";
import Debug from "../Utils/Debug";
import * as gui from "lil-gui";

export default class Fox {
    experience: Experience
    scene: THREE.Scene
    resources: Resources
    resource: any
    model: THREE.Group | null = null
    animation: any
    time: Time
    debug: Debug
    debugFolder: gui.GUI | null = null


    constructor() {
        this.experience = Experience.getInstance()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug

        // setup
        this.resource = this.resources.items.foxModel
        this.setModel()
        this.setAnimation()
        this.setDebug()
    }


    setModel() {
        this.model = this.resource.scene as THREE.Group
        this.model.scale.set(0.02, 0.02, 0.02)
        this.scene.add(this.model)
        this.model.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true
            }
        })
    }

    setDebug() {
        if (this.model && this.debug.ui) {
            this.debugFolder = this.debug.ui.addFolder('fox')
            // animation object
            const animation = ['idle', 'walking', 'running']

            const debugObject = {
                animation: animation[0],
            }
            this.debugFolder
                .add(debugObject, 'animation', animation)
                .onChange((val: string) => {
                    this.animation.play(val)
                })


        }

    }

    setAnimation() {
        if (!this.model) return
        this.animation = {}
        this.animation.mixer = new THREE.AnimationMixer(this.model)
        this.animation.actions = {}
        this.animation.actions.idle = this.animation.mixer.clipAction(this.resource.animations[0])
        this.animation.actions.walking = this.animation.mixer.clipAction(this.resource.animations[1])
        this.animation.actions.running = this.animation.mixer.clipAction(this.resource.animations[2])

        this.animation.actions.current = this.animation.actions.idle
        this.animation.actions.current.play() // remember to update in each frame

        this.animation.play = (name: string) => {
            const newAction = this.animation.actions[name] as THREE.AnimationAction // will transition into this one
            const oldAction = this.animation.actions.current as THREE.AnimationAction

            newAction.reset()
            newAction.play()
            newAction.crossFadeFrom(oldAction, 1)

            this.animation.actions.current = newAction
        }

    }
    update() {
        this.animation.mixer.update(this.time.delta * 0.001) // our delta is in ms and mixer in seconds so divide by 1000
    }
}