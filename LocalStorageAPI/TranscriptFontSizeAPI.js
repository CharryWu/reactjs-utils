import * as TranscriptConsts from 'LectureConstants/Transcript'

export const TRANSCRIPT_FONT_SIZE_KEY = 'evt-trans-fs'

/**
 * Save font size to localStorage.
 * @param {number} fs Range: [12, 24]. Font size number in pixels. If invalid
 * input nothing will be stored. If out of range, only the closest boundary value
 * would be stored
 * @author Zichao (Charry) Wu
 */
export const setFontSize = (fs) => {
    let store = window.localStorage
    let numToBeSet = TranscriptConsts.TRANSCRIPT_DEFAULT_TEXT_SIZE
    let parsedNum = Number(fs)

    if (store && fs) {
        if (parsedNum) {
            if (parsedNum > TranscriptConsts.TRANSCRIPT_TEXT_MAX_SIZE) {
                numToBeSet = TranscriptConsts.TRANSCRIPT_TEXT_MAX_SIZE
            } else if (parsedNum < TranscriptConsts.TRANSCRIPT_TEXT_MIN_SIZE) {
                numToBeSet = TranscriptConsts.TRANSCRIPT_TEXT_MIN_SIZE
            } else {
                numToBeSet = parsedNum
            }

            store.setItem(TRANSCRIPT_FONT_SIZE_KEY, numToBeSet)
        }
    }
}

/**
 * Read font size from localStorage.
 * @return {number} font size, in pixel unit, in localStorage if exists;
 * TranscriptConsts.TRANSCRIPT_DEFAULT_TEXT_SIZE otherwise
 * @author Zichao (Charry) Wu
 */
export const getFontSize = () => {
    let store = window.localStorage
    let res = TranscriptConsts.TRANSCRIPT_DEFAULT_TEXT_SIZE

    if (store) {
        let retrieveVal = Number(store.getItem(TRANSCRIPT_FONT_SIZE_KEY))
        if (!Number.isNaN(retrieveVal) && retrieveVal !== 0) {
            if (retrieveVal > TranscriptConsts.TRANSCRIPT_TEXT_MAX_SIZE) {
                res = TranscriptConsts.TRANSCRIPT_TEXT_MAX_SIZE
            } else if (retrieveVal < TranscriptConsts.TRANSCRIPT_TEXT_MIN_SIZE) {
                res = TranscriptConsts.TRANSCRIPT_TEXT_MIN_SIZE
            } else {
                res = retrieveVal
            }
        }
    }

    return res
}
