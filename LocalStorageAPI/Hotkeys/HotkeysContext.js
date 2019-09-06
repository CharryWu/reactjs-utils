import React from 'react'

//---------------- LectureViewer Global KeyStrokes
export const LectureViewerHotkeysDefaultPressedState = {
    hotkeysPressedState: {
        userZoomIn: false,
        userZoomOut: false,
        userZoomReset: false,
        goPrevSlide: false,
        goNextSlide: false,
        playPause: false,
    }
}

/**
 * Default values for callback (empty functions) and initial hot key flags
 * The parameter to createContext should have the same structure as App component's
 * state
 */
export const LectureViewerHotkeysContext = React.createContext(LectureViewerHotkeysDefaultPressedState)


//---------------- ControlPanel Global KeyStrokes