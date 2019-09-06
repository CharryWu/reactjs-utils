import {getStorageItemsWithPrefix, getLectureUidEncoding, DOT_SEPARATOR} from './LocalStorageBaseAPI'
import * as NotesConsts from 'LectureConstants/Notes'

export const NOTES_CURRENT_BLOB_KEY_PREFIX = 'evt-notes-cur-blob'

/**
 * Save current blob index to localStorage.
 * @param {number} currentBlobIndex the index of current blob in notes section
 * If invalid input nothing will be stored.
 * @author Zichao (Charry) Wu
 */
export const setCurrentBlobIdx = (currentBlobIndex, univ, semester, course, lectureId) => {
    let store = window.localStorage
    let parsedNum = Number(currentBlobIndex)

    if (store && !Number.isNaN(parsedNum)) {
        let lecUid = getLectureUidEncoding(univ, semester, course, lectureId)
        store.setItem(`${NOTES_CURRENT_BLOB_KEY_PREFIX}${DOT_SEPARATOR}${lecUid}`, parsedNum)
    }
}

/**
 * Get current blob index from localStorage.
 * @return {number} NotesConsts.INITIAL_BLOB_ID if dne / invalid
 * @author Zichao (Charry) Wu
 */
export const getCurrentBlobIdx = (univ, semester, course, lectureId) => {
    let store = window.localStorage
    let resultIdx = NotesConsts.INITIAL_BLOB_ID

    if (store) {
        let lecUid = getLectureUidEncoding(univ, semester, course, lectureId)
        let retrieveVal = Number(store.getItem(`${NOTES_CURRENT_BLOB_KEY_PREFIX}${DOT_SEPARATOR}${lecUid}`))

        if (!Number.isNaN(retrieveVal)) resultIdx = retrieveVal
    }

    return resultIdx
}

/**
 * Get all current blob indices from the redux store
 * @return {Array.<{key:string, value: string}>}
 * @author Zichao (Charry) Wu
 */
export const getAllCurrentBlobIndices = () => getStorageItemsWithPrefix(NOTES_CURRENT_BLOB_KEY_PREFIX)
