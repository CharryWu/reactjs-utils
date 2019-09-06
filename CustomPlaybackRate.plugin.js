/**
 * A custom plugin for adjusting playback rates.
 */
import videojs from 'video.js'

// Videojs specific references
const ClickableComponent = videojs.getComponent('ClickableComponent')
const Plugin = videojs.getPlugin('plugin')

export class CustomPlaybackRate extends ClickableComponent {
    constructor(player, options) {
        super(player, options)

        let DOMClassName = 'vjs-custom-playback-rate'

        this.el().insertAdjacentHTML('beforeend', 
            `<div class="${DOMClassName}">
                <div class="${DOMClassName}-minus">-</div>
                <div class="${DOMClassName}-current">${this.getPlaybackRate()}x</div>
                <div class="${DOMClassName}-plus">+</div>
            </div>`) 

        // Get reference to DOM element of the button
        this.DOMElement = this.el().querySelector(`.${DOMClassName}`)
        this.DOMElementCurrent = this.el().querySelector(`.${DOMClassName}-current`)
        this.DOMElementMinus = this.el().querySelector(`.${DOMClassName}-minus`)
        this.DOMElementPlus = this.el().querySelector(`.${DOMClassName}-plus`)

        // Set callbacks
        this.DOMElement.onmouseenter = this.handleOnMouseEnter.bind(this)
        this.DOMElement.onmouseleave = this.handleOnMouseLeave.bind(this)
        this.DOMElementMinus.onclick = this.handleMinusOnClick.bind(this)
        this.DOMElementPlus.onclick = this.handlePlusOnClick.bind(this)

        // Register ratechange
        this.player().on('ratechange', () => { 
            this.updatePlaybackRate()
        })

        // Misc Flags
        this.DEBUG = false
        this.delta = 0.2
    }

    getPlaybackRate(){
        return parseFloat(this.player().playbackRate()).toFixed(1)
    }

    updatePlaybackRate(){
        this.DOMElementCurrent.innerHTML = this.getPlaybackRate()  + 'x'
    }

    /**
     * Build the CSS class for the custom component
     */
    buildCSSClass() {
        return `vjs-custom-playback-rate-panel ${super.buildCSSClass()}`
    }

    handleFocus() {

    }

    handlePlusOnClick() {
        this.player().playbackRate(this.player().playbackRate() + this.delta)
    }

    handleMinusOnClick() {
        let formattedPlaybackRate = parseFloat(this.player().playbackRate()).toFixed(1)
        if(formattedPlaybackRate <= this.delta){
            return
        }

        this.player().playbackRate(this.player().playbackRate() - this.delta)
    }

    handleOnMouseLeave() {
        /**
         * TODO: Clean this up later.
         */
        this.DOMElementMinus.style.transition = 'opacity 0.2s ease-in'
        this.DOMElementMinus.style.opacity = 0
        this.DOMElementPlus.style.transition = 'opacity 0.2s ease-in'
        this.DOMElementPlus.style.opacity = 0
    }

    handleOnMouseEnter() {
        /**
         * TODO: Clean this up later.
         */
        this.DOMElementMinus.style.transition = 'opacity 0.2s ease-in'
        this.DOMElementMinus.style.opacity = 1
        this.DOMElementPlus.style.transition = 'opacity 0.2s ease-in'
        this.DOMElementPlus.style.opacity = 1
    }
}

export default class CustomPlaybackRatePlugin extends Plugin {
    constructor(player, options) {
        super(player, options)

        // Attach the component to the controlbar
        this.customPlaybackRate = this.player.getChild('controlBar').addChild('customPlaybackRate', {})
        this.player.controlBar.el().insertBefore(this.customPlaybackRate.el(), this.player.controlBar.currentTimeDisplay.el())
    }
}
