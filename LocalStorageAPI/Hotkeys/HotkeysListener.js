import React, {Component} from 'react'
import Hotkeys from 'react-hot-keys'

/**
 * @see ADD_NEW_KEY.README.md guide to add new global keystroke
 * @author Zichao (Charry) Wu
 */

//---------------- LectureViewer Global KeyStrokes
const NOTES_ZOOM_IN_KEY = 'ctrl+alt+='
const NOTES_ZOOM_OUT_KEY = 'ctrl+alt+-'
const NOTES_ZOOM_RESET_KEY = 'ctrl+alt+0'
const SLIDE_NEXT = 'ctrl+down'
const SLIDE_PREV = 'ctrl+up'
const PLAY_PAUSE = 'space'


const LECTURE_VIEWER_KEY_ARR = [
    NOTES_ZOOM_IN_KEY,
    NOTES_ZOOM_OUT_KEY,
    NOTES_ZOOM_RESET_KEY,
    SLIDE_NEXT,
    SLIDE_PREV,
    PLAY_PAUSE,
]

export class LectureViewerHotkeysListener extends Component {
    constructor(props) {
        super(props)
    }

    onKeyUp = (keyName, e, handle) => {
        switch (keyName) {
        case NOTES_ZOOM_IN_KEY:
            this.props.setHotkeyZoomInState()
            break
        case NOTES_ZOOM_OUT_KEY:
            this.props.setHotkeyZoomOutState()
            break
        case NOTES_ZOOM_RESET_KEY:
            this.props.setHotkeyZoomResetState()
            break
        case SLIDE_PREV:
            this.props.setHotkeyGoPrevSlideState()
            break
        case SLIDE_NEXT:
            this.props.setHotkeyGoNextSlideState()
            break
        case PLAY_PAUSE:
            this.props.setHotkeyPlayPauseState()
            break
        default:
        }
    }

    onKeyDown = (keyName, e, handle) => {
        // alert(keyName)
    }

    render() {
        return (
            <Hotkeys keyName={LECTURE_VIEWER_KEY_ARR.join(',')}
                onKeyDown={this.onKeyDown} onKeyUp={this.onKeyUp}>
            </Hotkeys>
        )
    }
}

//---------------- ControlPanel Global KeyStrokes