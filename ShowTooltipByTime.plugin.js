/**
 * This plugin is created by following the source code in the follwing url:
 * https://github.com/sprice/videojs-audio-tracks/blob/master/src/videojs-audio-tracks.js
 * @author Zichao Wu
 */
import videojs from 'video.js'
import * as VideoConsts from 'LectureConstants/Video'
const Plugin = videojs.getPlugin('plugin')

let TIMEOUT = null

/**
 * A plugin interface that forces seekbar mouse time tooltip to show up when the
 * timestamp is passed in
 */
export default class ShowTooltipByTimePlugin extends Plugin {

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
        this.fadeTimer = null
        if (options) {
            TIMEOUT = options.inactivityTimeout
        }
    }

    /**
     * A helper method to toggle the vjs control bar show/hide className 
     * It shouldn't be called directly
     * @param {boolean} shouldShow true to show control bar; false to hide
     * @param {boolean} showTooltip when false, show control bar but not the floating
     * time tooltip
     */
    toggleCtrlBar = (shouldShow, showTooltip) => {
        const FORCE_ACTIVE_CLASS_NAME = 'vjs-user-force-active'

        const timeTooltip = document.querySelector('.vjs-time-tooltip')
        const mouseDisplay = document.querySelector('.vjs-mouse-display')

        let tooltipSVG = document.getElementById('tooltip-svg')
        if (timeTooltip) {
            if (showTooltip) {
                if (tooltipSVG) tooltipSVG.remove()
                timeTooltip.style.visibility = 'visible'
            } else {
                // display an svg triangle instead of the tooltip
                if (!tooltipSVG) {
                    timeTooltip.insertAdjacentHTML('afterend', '<svg id="tooltip-svg" style="transform:translateX(-5px);position:absolute;bottom:10px;" height="15" width="10"><polygon points="0,0 10,0 10,10 5,15 0,10" fill="white" stroke="black"/>Sorry, your browser does not support inline SVG.</svg>')
                }

                timeTooltip.style.visibility = 'hidden'
            }
        }

        if (this.player) {
            if (shouldShow) {
                if (!this.player.hasClass(FORCE_ACTIVE_CLASS_NAME)) {
                    this.player.addClass(FORCE_ACTIVE_CLASS_NAME)
                }
            } else {
                if (this.player.hasClass(FORCE_ACTIVE_CLASS_NAME)) {
                    this.player.removeClass(FORCE_ACTIVE_CLASS_NAME)
                }
            }
        }
    }

    /**
     * When the mouse moves over the `ProgressControl`, the pointer position
     * gets passed down to the `MouseTimeDisplay` component.
     *
     * @param {number} time the time we want the progress bar to show
     * @see https://github.com/videojs/video.js/blob/master/src/js/control-bar/progress-control/progress-control.js#L47
     * @listen mousemove
     */
    setToolTipToTime = (time) => {
        const seekBar = this.player.controlBar.progressControl.seekBar

        if (seekBar) {
            const mouseTimeDisplay = seekBar.mouseTimeDisplay
            const seekBarRect = this.getBoundingClientRect(seekBar.el())
            let seekBarPoint = time/this.player.duration()

            this.player.userActive(true)

            // The default skin has a gap on either side of the `SeekBar`. This means that
            // it's possible to trigger this behavior outside the boundaries of the
            // `SeekBar`. This ensures we stay within it at all times.
            if (seekBarPoint > 1) {
                seekBarPoint = 1
            } else if (seekBarPoint < 0) {
                seekBarPoint = 0
            }

            if (mouseTimeDisplay) {
                mouseTimeDisplay.update(seekBarRect, seekBarPoint)
            }
        }
    }

    showTimeToolTip = (showTimeTooltip=true) => {
        // console.log(TIMEOUT)
        this.resetTimer()
        this.toggleCtrlBar(true,showTimeTooltip)
        this.fadeTimer = window.setTimeout(()=> this.toggleCtrlBar(false,true), TIMEOUT) // showTimeTooltip go to default, which is true
    }

    hideTimeToolTip = (showTimeTooltip=true) => {
        this.resetTimer()
        this.fadeTimer = window.setTimeout(()=> this.toggleCtrlBar(false,showTimeTooltip), TIMEOUT)
    }

    resetTimer = () => {
        if (this.fadeTimer) {
            window.clearTimeout(this.fadeTimer)
            this.fadeTimer = null
        }
    }

    /**
     * A safe getComputedStyle.
     *
     * This is needed because in Firefox, if the player is loaded in an iframe with
     * `display:none`, then `getComputedStyle` returns `null`, so, we do a null-check to
     * make sure  that the player doesn't break in these cases.
     *
     * @param {Element} el
     *        The element you want the computed style of
     *
     * @param {string} prop
     *        The property name you want
     *
     * @see https://bugzilla.mozilla.org/show_bug.cgi?id=548397
     * @see https://github.com/videojs/video.js/blob/master/src/js/utils/computed-style.js#L7
     *
     * @static
     * @const
     */
    computedStyle = (el, prop) => {
        if (!el || !prop) {
            return ''
        }

        if (typeof window.getComputedStyle === 'function') {
            const cs = window.getComputedStyle(el)

            return cs
                ? cs[prop]
                : ''
        }
        return ''
    }

    /**
     * Identical to the native `getBoundingClientRect` function, but ensures that
     * the method is supported at all (it is in all browsers we claim to support)
     * and that the element is in the DOM before continuing.
     *
     * This wrapper function also shims properties which are not provided by some
     * older browsers (namely, IE8).
     *
     * Additionally, some browsers do not support adding properties to a
     * `ClientRect`/`DOMRect` object so, we shallow-copy it with the standard
     * properties (except `x` and `y` which are not widely supported). This helps
     * avoid implementations where keys are non-enumerable.
     *
     * @param  {Element} el
     *         Element whose `ClientRect` we want to calculate.
     *
     * @return {Object|undefined}
     *         Always returns a plain
     *
     * @see https://github.com/videojs/video.js/blob/master/src/js/utils/dom.js#L478
     */
    getBoundingClientRect = (el) => {
        if (el && el.getBoundingClientRect && el.parentNode) {
            const rect = el.getBoundingClientRect()
            const result = {};

            [
                'bottom',
                'height',
                'left',
                'right',
                'top',
                'width'
            ].forEach(k => {
                if (rect[k] !== undefined) {
                    result[k] = rect[k]
                }
            })

            if (!result.height) {
                result.height = parseFloat(this.computedStyle(el, 'height'))
            }

            if (!result.width) {
                result.width = parseFloat(this.computedStyle(el, 'width'))
            }

            return result
        }
    }
}
