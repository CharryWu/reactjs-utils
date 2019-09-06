import * as VideoConsts from 'LectureConstants/Video'

export const VIDEO_MODE_KEY = 'evt-video-mode'

/**
 * Save current video mode to localStorage.
 * @param {number} videoMode the video mode of current lecture
 * @author Zichao (Charry) Wu
 */
export const setVideoMode = (videoMode) => {
    let store = window.localStorage

    if (store) { store.setItem(VIDEO_MODE_KEY, videoMode) }
}

/**
 * Get video mode of the give lecture from localStorage.
 * @return {string}
 * @author Zichao (Charry) Wu
 */
export const getVideoMode = () => {
    let store = window.localStorage
    let returnVal = VideoConsts.ORIGINAL_MODE
    let retrieveVal = VideoConsts.ORIGINAL_MODE

    if (store) {
        retrieveVal = store.getItem(VIDEO_MODE_KEY)
        if (retrieveVal) returnVal = retrieveVal
    }

    return returnVal
}