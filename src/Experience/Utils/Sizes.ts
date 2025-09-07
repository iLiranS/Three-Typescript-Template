import EventEmitter from './EventEmitter'

export default class Sizes extends EventEmitter {
    width: number
    height: number
    pixelRatio: number


    constructor() {
        // Super
        super()

        // setup
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.pixelRatio = Math.min(window.devicePixelRatio, 2)

        // Resize events
        window.addEventListener('resize', () => {
            this.width = window.innerWidth
            this.height = window.innerHeight
            // event emitter
            this.trigger('resize')
        })

    }
}