import {getStorageItemsWithPrefix, getLectureUidEncoding, DOT_SEPARATOR} from './LocalStorageBaseAPI'

export const PLAY_TIME_KEY_PREFIX = 'evt-play-time'

/**
 *
 * @param {number} playTime the last play time, in seconds, of the lecture to be
 * stored
 * @param {string} univ
 * @param {string} semester 
 * @param {string} course 
 * @param {string} lectureId 
 */
export const setPlayTime = (playTime, univ, semester, course, lectureId) => {
    let store = window.localStorage
    let parsedNum = Number(playTime)

    if (store && !Number.isNaN(parsedNum)) {
        let lecUid = getLectureUidEncoding(univ, semester, course, lectureId)
        store.setItem(`${PLAY_TIME_KEY_PREFIX}${DOT_SEPARATOR}${lecUid}`, parsedNum)
    }
}

/**
 * 
 * @param {*} univ 
 * @param {*} semester 
 * @param {*} course 
 * @param {*} lectureId 
 * @return {number} 0 if dne / invalid
 */
export const getPlayTime = (univ, semester, course, lectureId) => {
    let store = window.localStorage
    let resultTime = 0

    if (store) {
        let lecUid = getLectureUidEncoding(univ, semester, course, lectureId)
        let retrieveVal = Number(store.getItem(`${PLAY_TIME_KEY_PREFIX}${DOT_SEPARATOR}${lecUid}`))
        if (retrieveVal) resultTime = retrieveVal
    }

    return resultTime
}

/**
 * Get all playTimes from localStorage
 * @return {Array.<{key:string, value: string}>}
 * @author Zichao (Charry) Wu
 */
export const getAllPlayTimes = () => getStorageItemsWithPrefix(PLAY_TIME_KEY_PREFIX)
