import * as gui from 'lil-gui'
export default class Debug {
    active: boolean
    ui: gui.GUI | null = null

    constructor() {
        this.active = window.location.hash === '#debug'
        if (this.active) {
            this.ui = new gui.GUI()
            // initiate all the debug elements inside the world classes and not here.
        }
    }
}