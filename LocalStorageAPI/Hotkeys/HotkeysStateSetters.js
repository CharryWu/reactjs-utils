import {LectureViewerHotkeysDefaultPressedState} from './HotkeysContext'

/**
 * @param {App} LectureViewerAppThis an instance of App component from LectureViewer
 * @return {{setHotkeyZoomInState: Function, setHotkeyZoomOutState: Function, resetHotkey: Function, setHotkeyZoomResetState: Function}}
 * A collection of state mutators to be passed to HotkeysListeners and HotkeysConsumers as props
 * @author Zichao (Charry) Wu
 */
export const AppHotkeysStateSetters = (LectureViewerAppThis) => ({

    resetHotkey: () => {
        LectureViewerAppThis.setState({
            hotkeysPressedState: LectureViewerHotkeysDefaultPressedState.hotkeysPressedState
        })
    },

    setHotkeyZoomInState: () => {
        LectureViewerAppThis.setState({
            hotkeysPressedState: {
                ...LectureViewerAppThis.state.hotkeysPressedState,
                userZoomIn: true
            }
        })
    },

    setHotkeyZoomOutState: () => {
        LectureViewerAppThis.setState({
            hotkeysPressedState: {
                ...LectureViewerAppThis.state.hotkeysPressedState,
                userZoomOut: true
            }
        })
    },

    setHotkeyZoomResetState: () => {
        LectureViewerAppThis.setState({
            hotkeysPressedState: {
                ...LectureViewerAppThis.state.hotkeysPressedState,
                userZoomReset: true
            }
        })
    },

    setHotkeyGoPrevSlideState: () => {
        LectureViewerAppThis.setState({
            hotkeysPressedState: {
                ...LectureViewerAppThis.state.hotkeysPressedState,
                goPrevSlide: true
            }
        })
    },

    setHotkeyGoNextSlideState: () => {
        LectureViewerAppThis.setState({
            hotkeysPressedState: {
                ...LectureViewerAppThis.state.hotkeysPressedState,
                goNextSlide: true
            }
        })
    },

    setHotkeyPlayPauseState: () => {
        LectureViewerAppThis.setState({
            hotkeysPressedState: {
                ...LectureViewerAppThis.state.hotkeysPressedState,
                playPause: true
            }
        })
    },
})