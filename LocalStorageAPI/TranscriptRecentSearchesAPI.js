import {getStorageItemsWithPrefix, getLectureUidEncoding, DOT_SEPARATOR} from './LocalStorageBaseAPI'
import TranscriptSearch from 'Utils/TranscriptSearch'
export const TRANSCRIPT_SEARCH_KEY_PREFIX = 'evt-trans-s'

/**
 * Save a lecture-specific recent search item into localStorage
 * @param {string} userInput
 * @param {string} univ
 * @param {string} semester
 * @param {string} course
 * @param {string} lectureId
 * @author Zichao (Charry) Wu
 */
export const saveSearchToHistory = (userInput, univ, semester, course, lectureId) => {
    let store = window.localStorage
    if (store && userInput) {
        let processedInputTokens = TranscriptSearch.getValidQueryTokens(userInput, false)
        if (processedInputTokens !== -1) {
            let processedInput = processedInputTokens.join(' ')
            // remove old recent search items with similar values to avoid double entry
            let existingRecentSearches = getStorageItemsWithPrefix(TRANSCRIPT_SEARCH_KEY_PREFIX)
            existingRecentSearches.forEach( ({key,value}) => {
                // remove all value that matches either userinput or similar input
                if ([userInput, processedInput].includes(value)) {
                    store.removeItem(key)
                }
            })
            let lecUid = getLectureUidEncoding(univ, semester, course, lectureId)
            store.setItem(`${TRANSCRIPT_SEARCH_KEY_PREFIX}${DOT_SEPARATOR}${lecUid}${DOT_SEPARATOR}${new Date().getTime()}`, userInput)
        }
    }
}

/**
 * Get all recent searches of all lectures
 * @return {Array.<{key:string, value: string}>}
 * @author Zichao (Charry) Wu
 */
export const getAllRecentSearches = () => getStorageItemsWithPrefix(TRANSCRIPT_SEARCH_KEY_PREFIX)
