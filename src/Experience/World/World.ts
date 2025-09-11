import Experience from "../Experience";
import Environment from "./Environment";
import Resources from "../Utils/Resources";
import Floor from "./Floor";
import Fox from "./Fox";

// here we will add all the meshes
export default class World {
    experience: Experience
    environment: Environment | null = null
    resources: Resources
    floor: Floor | null = null
    fox: Fox | null = null

    constructor() {
        this.experience = Experience.getInstance()
        this.resources = this.experience.resources



        // when all resources are loaded
        this.resources.on("ready", () => {

            // Setup
            this.floor = new Floor()
            this.fox = new Fox()

            this.environment = new Environment() // after everything to apply to all meshes in the scene
        })
    }
    update() {
        if (this.fox) this.fox.update()
    }
}