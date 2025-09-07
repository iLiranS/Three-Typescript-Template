import Experience from "../Experience";
import * as THREE from 'three'
import Environment from "./Environment";
import Resources from "../Utils/Resources";
import Floor from "./Floor";

// here we will add all the meshes
export default class World {
    experience: Experience
    environment: Environment | null = null
    resources: Resources
    floor: Floor | null = null

    constructor() {
        this.experience = Experience.getInstance()
        this.resources = this.experience.resources

        // test
        const cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshStandardMaterial({ color: new THREE.Color(10, 4, 2) }))
        this.experience.scene.add(cube)
        cube.castShadow = true
        cube.position.y = 0.5

        // when all resources are loaded
        this.resources.on("ready", () => {

            // Setup
            this.environment = new Environment()
            this.floor = new Floor()
        })


    }
}