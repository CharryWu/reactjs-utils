/**
 * This plugin is created by following the source code in the follwing url:
 * https://github.com/sprice/videojs-audio-tracks/blob/master/src/videojs-audio-tracks.js
 * @author Zichao Wu
 */
import videojs from 'video.js'
import {getHMSStrFromSeconds,getSecondsFromHMSStr} from 'Utils/TimeUtils'

const ClickableComponent = videojs.getComponent('ClickableComponent')
const Plugin = videojs.getPlugin('plugin')

export class SeekTextInput extends ClickableComponent {

    constructor(player, options) {
        super(player, options)

        this.DEBUG = false

        let DOMClassName = 'vjs-seek-text-input'

        this.el().insertAdjacentHTML('beforeend',
            `<input type="text" class="${DOMClassName}" required="required" />
            <span class="${DOMClassName}-enter-symbol">↵</span>`)
        this.inputDOM = this.el().querySelector(`.${DOMClassName}`)

        // keep SeekTextInput obj and this.inputDOM's focus/blur/input events in sync
        this.inputDOM.onblur = this.handleBlur.bind(this) // avoid this binded to DOM el
        this.inputDOM.onkeypress = this.handleKeyPress.bind(this)
        this.inputDOM.defaultValue = getHMSStrFromSeconds(this.player().currentTime())
        this.inputDOM.onpropertychange = this.inputDOM.oninput = this.handleDOMInput.bind(this)
    }

    buildCSSClass() {
        return `vjs-seek-text-input-panel ${super.buildCSSClass()}`
    }

    handleClick() {
        if(this.DEBUG) console.warn('clicked')
    }

    handleBlur() {        
        if(this.DEBUG) console.warn('blurred')
        // don't forget the parenthesis when calling this.player()
        this.player().seekTextInputPlugin().hideTimeInput()
    }

    handleFocus() {
        if(this.DEBUG) console.warn('focused')
        if (this.inputDOM) {
            this.inputDOM.value = getHMSStrFromSeconds(this.player().currentTime())
            this.inputDOM.focus() // keep SeekTextInput obj and this.inputDOM's focus/blur event in sync
        }
    }

    handleKeyPress(event) {
        if(this.DEBUG) console.warn('keypressed')
        if ((event.key && event.key === 'Enter') || (event.keyCode && event.keyCode === 13) 
        || (event.which && event.which === 13)) {
            
            if (!this.inputDOM.value.match(/^([0-1][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/g)) {
                if (this.DEBUG) console.warn('Invalid seek time input:', this.inputDOM.value)
                return
            }

            let seconds = getSecondsFromHMSStr(this.inputDOM.value)
            
            if (seconds <= this.player().duration()) {
                this.player().currentTime(seconds)
                this.trigger('blur')
            } else {
                if (this.DEBUG) console.warn('input', this.inputDOM.value, '> duration', this.player().duration())
                // TODO - prompt user if input > duration
            }
        }
    }

    handleDOMInput(event) {

    }
}

export default class SeekTextInputPlugin extends Plugin {

    /**
     * With advanced plugins, the value of this is the instance of the plugin class.
     * The player is passed to the plugin constructor as its first argument
     * and any further arguments are passed after that.
     * @param {*} player the instance of the plugin class and is automatically
     * applied to the plugin instance as the player property
     * @param {*} options
     */
    constructor(player, options) {
        super(player, options)

        this.player.on('loadeddata', ()=>{
            this.seekTextInput = this.player.getChild('controlBar').addChild('seekTextInput', {})
            this.player.controlBar.el().insertBefore(this.seekTextInput.el(), this.player.controlBar.currentTimeDisplay.el())
            this.seekTextInput.hide()

            this.player.controlBar.currentTimeDisplay.on('click', ()=>{
                this.showTimeInput()
            })
        })
    }

    showTimeInput() {
        this
            .player
            .controlBar
            .currentTimeDisplay
            .hide()
        this.seekTextInput.show()
        this.seekTextInput.trigger('focus')
    }

    hideTimeInput() {
        this
            .player
            .controlBar
            .currentTimeDisplay
            .show()

        this.seekTextInput.hide()
        
    }
}
