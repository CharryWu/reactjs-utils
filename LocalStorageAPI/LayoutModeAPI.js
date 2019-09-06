import * as layoutAction from 'LectureActions/LayoutAction'

export const LAYOUT_MODE_KEY = 'evt-layout'

/**
 * Save current layout mode to localStorage.
 * @param {string} layoutMode the global layout mode
 * @author Zichao (Charry) Wu
 */
export const setLayout = (layoutMode) => {
    let store = window.localStorage

    if (store) { store.setItem(LAYOUT_MODE_KEY, layoutMode) }
}

/**
 * Get layout mode of the give lecture from localStorage.
 * @return {string} layoutAction.LAYOUT_WIDE if dne / invalid
 * @author Zichao (Charry) Wu
 */
export const getLayout = () => {
    let store = window.localStorage
    let returnVal = layoutAction.LAYOUT_WIDE
    let retrieveVal = layoutAction.LAYOUT_WIDE

    if (store) {
        retrieveVal = store.getItem(LAYOUT_MODE_KEY)
        if (retrieveVal) returnVal = retrieveVal
    }

    return returnVal
}