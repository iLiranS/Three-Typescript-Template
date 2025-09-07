import Experience from "../Experience";
import * as THREE from 'three'

// here we will add all the meshes
export default class World {
    experience: Experience

    constructor() {
        this.experience = Experience.getInstance()

        // test
        const holyDonut = new THREE.Mesh(new THREE.TorusGeometry(8, 0.5), new THREE.MeshBasicMaterial({ color: new THREE.Color(10, 4, 2) }))
        this.experience.scene.add(holyDonut)
    }
}