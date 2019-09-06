import * as NotesConsts from 'LectureConstants/Notes'
import {getStorageItemsWithPrefix, getLectureUidEncoding, DOT_SEPARATOR} from './LocalStorageBaseAPI'

export const NOTES_ZOOM_KEY_PREFIX = 'evt-notes-zoom'

/**
 * Save zoom level to localStorage.
 * @param {number} zoomIdx Range: [0, NotesConsts.ZOOM_LEVELS.length-1]. Zoom level
 * index in NotesConsts.ZOOM_LEVELS array.
 * If invalid input nothing will be stored.
 * If out of range, only the closest boundary value would be stored
 * @author Zichao (Charry) Wu
 */
export const setZoomLevelIdx = (zoomIdx, univ, semester, course, lectureId) => {
    let store = window.localStorage
    let idxToBeSet = NotesConsts.DEFAULT_ZOOM_LEVEL_IDX
    let parsedNum = Number(zoomIdx)

    if (store && !Number.isNaN(parsedNum)) {
        let lecUid = getLectureUidEncoding(univ, semester, course, lectureId)

        if (parsedNum >= NotesConsts.ZOOM_LEVELS.length) {
            idxToBeSet = NotesConsts.ZOOM_LEVELS.length - 1
        } else if (parsedNum < 0) idxToBeSet = 0
        else idxToBeSet = parsedNum

        store.setItem(`${NOTES_ZOOM_KEY_PREFIX}${DOT_SEPARATOR}${lecUid}`, idxToBeSet)
    }
}

/**
 * Read zoom level from localStorage
 * @return {number} zoom level index in localStorage if exists;
 * NotesConsts.DEFAULT_ZOOM_LEVEL_IDX otherwise
 * @author Zichao (Charry) Wu
 */
export const getZoomLevelIdx = (univ, semester, course, lectureId) => {
    let store = window.localStorage
    let resultIdx = NotesConsts.DEFAULT_ZOOM_LEVEL_IDX

    if (store) {
        let lecUid = getLectureUidEncoding(univ, semester, course, lectureId)
        let retrieveVal = Number(store.getItem(`${NOTES_ZOOM_KEY_PREFIX}${DOT_SEPARATOR}${lecUid}`))

        if (retrieveVal) {
            if (retrieveVal > NotesConsts.ZOOM_LEVELS.length - 1) {
                resultIdx = NotesConsts.ZOOM_LEVELS.length - 1
            } else if (retrieveVal < 0) resultIdx = 0
            else resultIdx = retrieveVal
        }
    }

    return resultIdx
}

/**
 * Get all zoom level indices of the current key
 * @return {Array.<{key:string, value: string}>}
 * @author Zichao (Charry) Wu
 */
export const getAllZoomLevelIndices = () => getStorageItemsWithPrefix(NOTES_ZOOM_KEY_PREFIX)
