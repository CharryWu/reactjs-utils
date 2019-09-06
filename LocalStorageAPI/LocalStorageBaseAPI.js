export const CLEAR_EXCLUDE_KEY = []
export const DOT_SEPARATOR = '.'

/**
 * An collection of util functions to decide if strings match
 * @author Zichao (Charry) Wu
 */
export const MATCH_POLICIES = {
    isExactMatch: (str1, str2) => str1 === str2,
    isExactMatchIgnoreCase: (str1, str2) => str1.toLowerCase() === str2.toLowerCase(),
    hasPrefix: (str1, prefix) => str1.startsWith(prefix),
    hasPrefixIgnoreCase: (str1, prefix) => str1.toLowerCase().startsWith(prefix.toLowerCase()),
}

export const getLectureUidEncoding = (univ, semester, course, lectureId) => (
    [univ,semester,course,lectureId].join('#')
)

/**
 * @param {string} prefix
 * @param {Object} store a one-level deep object (collection of key-value pairs)
 * with no nested subobjects. Defaults to window.localStorage.
 * @return {Array.<{key:string,value:string}>} unsorted storage items whose key starts
 * with the given prefix
 * @author Zichao (Charry) Wu
 */
export const getStorageItemsWithPrefix = (prefix, store = window.localStorage) => {
    let res = []

    if (store && prefix) {
        for (let i = 0; i < store.length; i++) {
            let curkey = store.key(i)
            if (MATCH_POLICIES.hasPrefix(curkey,prefix)){
                res.push({
                    key: curkey,
                    value: store.getItem(curkey)
                })
            }
        }
    }

    return res
}

/**
 * Purge the localStorage
 * @param {Array.<String>} exceptions an array of keys whose corresponding
 * storage items are to be excepted from the purging
 * @author Zichao (Charry) Wu
 */
export const clearAllStorageItemsExcluding = (exceptions = CLEAR_EXCLUDE_KEY) => {
    let store = window.localStorage

    if (store) {
        let storageKeys = Object.keys(store).slice(0) // copy store keys to a new arr

        storageKeys.filter(storageKey => {
            return !exceptions.some(exceptionKey => {
                return MATCH_POLICIES.isExactMatch(storageKey,exceptionKey)
            })
        }).forEach(purgeKey => store.removeItem(purgeKey))
    }
}
