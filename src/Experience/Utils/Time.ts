import EventEmitter from "./EventEmitter";

export default class Time extends EventEmitter {
    start: number
    current: number
    elapsed: number
    delta: number

    constructor() {
        super()

        // setup
        this.start = Date.now()
        this.current = this.start
        this.elapsed = 0
        this.delta = 16 // not 0 for bugs

        window.requestAnimationFrame(() => {
            this.tick()
        })
    }

    tick(): void {
        const currentTime = Date.now()
        this.delta = currentTime - this.current
        this.current = currentTime
        this.elapsed = this.current - this.start
        this.trigger('tick')

        window.requestAnimationFrame(() => {
            this.tick()
        })
    }
}