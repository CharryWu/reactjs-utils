/* NOTE: This copying util method of updateObject isn't required anymore as
 * ES6's spread operator does the work of NOT mutating the state excellently.
 * Check the TestReducer to the changes made
 */

// Deprecated export const updateObject = (oldObject, newValues) => {     return
// Object.assign({}, oldObject, newValues) }

/**
 *
 * @param {Object} lectures state.lectures
 * @param {string} lectureId
 * @return {object} state.courseinfo.lectures.byId[lectureId], defaults to last
 * lecture if dne
 */

/**
 * TODO: MOVE THIS
 */
export const selectLectureIfExist = (lectures, lectureId) => {
    // Default the lecture if not a string!
    if (typeof (lectureId) == 'string')
        lectureId = lectureId.toLowerCase()
    else lectureId = ''

    if (lectures.allId.indexOf(lectureId) >= 0) {
        return lectureId
    }

    // Default to last lecture (as in podcast) if doesn't exist
    return lectures.allId.slice(-1)[0]
}

/**
 * TODO: MOVE THIS
 */
export const selectLectureTitle = (lectures, lectureId) => lectures.byId[lectureId].title

/**
 * TODO: MOVE THIS
 */
export const selectCurrentLecture = (lectures, lectureId) => lectures.byId[lectureId]

/**
 * Restrict certain functionalities to development mode only.
 * @param {*} anything
 */
export const __DEV_ONLY__ = (anything) => {
    if (process.env.NODE_ENV !== 'production') {
        return anything
    }

    return null
}

/**
 * Restrict certain functionalities to production mode only.
 * @param {*} anything
 */
export const __PROD_ONLY__ = (anything) => {
    if (process.env.NODE_ENV === 'production') {
        return anything
    }

    return null
}

/**
 * @param {number} wait The function will be called after it stops being called 
 * for `wait` milliseconds.
 * @param {boolean} immediate If `immediate` is passed, trigger the function on
 * the leading edge, instead of the trailing.
 * @return a function, that, as long as it continues to be invoked, will not
 * be triggered. 
 * @author David Walsh 
 * @see https://davidwalsh.name/javascript-debounce-function
 */
export const debounce = (func, wait, immediate = false) => {
    let timeout

    // This is the function that is actually executed when
    // the DOM event is triggered.
    return function executedFunction() {
        // Store the context of this and any
        // parameters passed to executedFunction
        const context = this
        const args = arguments

        // The function to be called after 
        // the debounce time has elapsed
        const later = () => {
            // null timeout to indicate the debounce ended
            timeout = null

            // Call function now if you did not on the leading end
            if (!immediate) func.apply(context, args)
        }

        // Determine if you should call the function
        // on the leading or trail end
        const callNow = immediate && !timeout

        // This will reset the waiting every function execution.
        // This is the step that prevents the function from
        // being executed because it will never reach the 
        // inside of the previous setTimeout  
        clearTimeout(timeout)

        // Restart the debounce waiting period.
        // setTimeout returns a truthy value (it differs in web vs node)
        timeout = setTimeout(later, wait)

        // Call immediately if you're dong a leading
        // end execution
        if (callNow) func.apply(context, args)
    }
}

/**
 * @param {number} limit the min interval between invocation of `func`
 * @return a function which will not be invoked 
 * @author Jhey Tompkins
 * @see https://codeburst.io/throttling-and-debouncing-in-javascript-b01cad5c8edf
 */
export const throttle = (func, limit) => {
    let lastFunc
    let lastRan
    return function () {
        const context = this
        const args = arguments
        if (!lastRan) {
            func.apply(context, args)
            lastRan = Date.now()
        } else {
            clearTimeout(lastFunc)
            lastFunc = setTimeout(function () {
                if ((Date.now() - lastRan) >= limit) {
                    func.apply(context, args)
                    lastRan = Date.now()
                }
            }, limit - (Date.now() - lastRan))
        }
    }
}

/**
 * Decorator function for parameter->output memoization/caching
 * @param {Function} fn the function for which output is cached
 * @author Zichao (Charry) Wu
 */
export const memoize = (fn) => {
    let cache = {}
    return (...args) => {
        let thisArgStr = JSON.stringify(args)
        if (thisArgStr in cache) {
            return cache[thisArgStr]
        }
        else {
            let result = fn(...args)
            cache[thisArgStr] = result
            return result
        }
    }
}

/**
 * Access nested object property value via a path string
 * @author Zichao (Charry) Wu
 * @param {object} obj an object with at least one property
 * @param {string} pathString path string as you would access the prop in code. 
 * e.g. `'part1.name'` if you want to access `obj.part1.name`
 * @example
 * // returns 'Part 1'
 * byString({
 *   'part1' : {
 *     'name': 'Part 1',
 *     'size': '20',
 *     'qty' : '50'
 * }}, 'part1.name')
 * @see https://stackoverflow.com/a/6491621
 */
export const getValByPath = (obj, pathString) =>
    pathString
  .replace(/\[(\w+)\]/g, '.$1') // convert indexes to properties
  .replace(/^\./, '') // strip a leading dot
  .split('.') // array of subpaths
  .reduce((acc,cur) => acc[cur], obj) // flatten object to value via subpaths


/**
 * Invoked when `val1` and `val2` are different
 * @author Zichao (Charry) Wu
 * @callback diffCallback
 * @param {any} val1
 * @param {any} val2
 */

/**
 * Shallow diff a pair of values by their given paths into respective objects and 
 * invoke callback when difference is detected.
 * @author Zichao (Charry) Wu
 * @param {object} obj1 an object with at least one property
 * @param {object} obj2 an object with at least one property
 * @param {string} path1 property to be diffed for `obj1` 
 * @param {string} path2 property to be diffed for `obj2` 
 * @param {diffCallback} callback invoked when different prop value is detected, with
 * first arg from the prop val of first obj and second arg from second obj
 * @example
 * // logs '3 4'
 * diffValByPath({'prop':3}, {'prop':4}, 'prop', 'prop', (val1,val2)=>console.log(val1,val2))
 */
export const diffValByPath = (obj1, obj2, path1, path2, callback) => {
    const val1 = getValByPath(obj1, path1)
    const val2 = getValByPath(obj2, path2)

    // Sanity check: fail for invalid path
    if ([val1,val2].includes(undefined)) { return } // undefined === undefined
    else if (val1 !== val2) { callback(val1, val2) }
}

/**
 * Shallow diff multiple pairs of values by their given paths into respective
 * objects and invoke corresponding callback functions when difference is detected. 
 * Particularly useful to diff React component props in componentDidUpdate method.
 * @author Zichao (Charry) Wu
 * @param {object} obj1 an object with at least one property
 * @param {object} obj2 an object with at least one property
 * @param {{string:diffCallback}} config path string as value, callback as key. 
 * `obj1` and `obj2` could have different path strings. In this case, a `|` should
 * be used to separate the two path strings.
 * @example
 * // logs '3 4'
 * // logs '21'
 * diffValByPath({'prop':3, 'a':10 }, {'prop':4, 'b':11 }, { 
 *     'prop':(val1,val2)=>console.log(val1,val2),
 *     'a|b': (val1,val2)=>console.log(val1+val2)
 * })
 */
export const diffValsByPaths = (obj1, obj2, config) => {
    Object.entries(config).forEach(([path,callback])=>{
        if (path.includes('|')) {
            const [path1,path2] = path.split('|')
            diffValByPath(obj1,obj2,path1,path2,callback)
        } else {
            diffValByPath(obj1,obj2,path,path,callback)
        }
    })
}

/**
 * Rename object property. NOTE: oldKey->newKey
 * @param obj
 * @param {{string:string}} mappings dict of mappings from old name to new name
 * @return {object} a renamed copy of the given object
 * @author Zichao (Charry) Wu
 * @See https://stackoverflow.com/a/14592469
 */
export const renameProps = (obj, mappings) => {
    let o = {...obj}
    for (const [oldKey,newKey] of mappings) {
        o[newKey]=o[oldKey]
        delete o[oldKey]
    }
    return o
}

/**
 * Select properties from object. NOTE: newKey->oldKey
 * @param obj
 * @param {{string:string}} mappings dict of mappings from **new** name to **old** name
 * @return {object} a renamed copy of the given object
 * @author Zichao (Charry) Wu
 * @See https://stackoverflow.com/a/14592469
 */
export const propsFrom = (obj, ...selectedProps) => {
    let o = {}
    for (const prop of selectedProps) {
        if (typeof(prop) === 'string') { // same key props
            o[prop] = obj[prop]
        } else if (typeof(prop) === 'object') { // renamed props: `newKey:oldKey` in `selectedProps`
            Object.entries(prop).forEach(([newKey,oldKey]) => [
                o[newKey] = obj[oldKey]
            ])
        }
    }

    return o
}