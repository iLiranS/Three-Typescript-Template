import * as THREE from 'three'
import Experience from "../Experience";
import Resources from '../Utils/Resources';

export default class Environment {
    experience: Experience
    scene: THREE.Scene
    resources: Resources
    environmentMap: any


    constructor() {
        this.experience = Experience.getInstance()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        // default lights
        this.setSunlight()
        // this.setAmbientlight()
        this.setEnvironmentMap()
    }
    setSunlight() {
        const directionalLight = new THREE.DirectionalLight('#ffffff', 4)
        directionalLight.castShadow = true
        directionalLight.shadow.camera.far = 15
        directionalLight.shadow.mapSize.set(1024, 1024)
        directionalLight.shadow.normalBias = 0.05
        directionalLight.position.set(3.5, 2, - 1.25)
        this.scene.add(directionalLight)
    }
    setAmbientlight() {
        const ambientLight = new THREE.AmbientLight(0xffffff, 1) // color , intensity
        this.scene.add(ambientLight)
    }
    setEnvironmentMap() {
        this.environmentMap = {}
        this.environmentMap.intensity = 0.4
        this.environmentMap.texture = this.resources.items.environmentMapTexture
        this.environmentMap.texture.colorSpace = THREE.SRGBColorSpace
        this.scene.environment = this.environmentMap.texture
        // this.scene.background = this.environmentMap.texture
        this.updateMaterial()


    }
    // after setting env map we need to update children for weird issues
    updateMaterial = () => {
        this.scene.traverse((child) => {
            if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
                child.material.envMap = this.environmentMap.texture
                child.material.envMapIntensity = this.environmentMap.intensity
                child.material.needsUpdate = true
            }
        })
    }

}
