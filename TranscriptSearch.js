import Fuse from 'fuse.js'
import {PUNCTUATION_REGEX} from 'LectureConstants/Transcript'
/**
 * A utility object used to search through the transcript sentence data given user
 * pattern string. The whole point of using fuzzy search instead of exact match
 * is to enable user to still get the closest match had they omitted some word in
 * search pattern or enter the words in a wrong order.
 * @author Zichao (Charry) Wu
 */

// search range radius for each sentence (in # of chars) = initOptions.distance
// * initOptions.threshold search range for each sentence (in # of chars) = [
// max(0, location - radius),      min(location + distance * threshold,
// sentence.length) ]

const DEFAULT_MIN_CHAR_LENGTH = 2

const defaultOptions = {
    caseSensitive: false,
    shouldSort: true,
    includeScore: true,
    includeMatches: false,
    tokenize: true,
    matchAllTokens: true, // enforce user enter correct word tokens
    findAllMatches: false,
    threshold: 0.1,
    location: 60,
    distance: 1500,
    maxPatternLength: 40,
    minMatchCharLength: DEFAULT_MIN_CHAR_LENGTH,
    keys: [],
    id: null
}

export default class TranscriptSearch {

    /**
     * Pure function to tokenize the input string (stripping away white spaces)
     * @param {string} originalStr user input string
     * @return {Array.<string>} sanitized user input array
     */
    static getTokenizedWordsArr(originalStr) {
        if (!originalStr || !originalStr.length) return []

        return originalStr
            .split(/(\s+)/)
            .filter(token => token.trim().length > 0)
    }

    /**
     * Validator for tokenized user input
     * @param {Array.<string>} patternTokens
     * @return true if the tokens represents a valid search query string, false otherwise
     */
    static _isValidSearchTokens(patternTokens) {
        // sanity check: whitespace-only pattern
        if (!patternTokens.length) return false
        // sanity check: single-character token
        else if (patternTokens.length === 1) {
            if (patternTokens[0].length === 1) return false
        }

        // sanity check: the sentence doesn't solely consist of punctuations
        if (!TranscriptSearch._tokensHaveAnyValidWord(patternTokens)) return false

        return true
    }

    /**
     * @param {Array.<string>} patternTokens a token array with length > 1
     */
    static _tokensHaveAnyValidWord(patternTokens) {
        return patternTokens.some(token=>{
            if (token.replace(PUNCTUATION_REGEX,'')) return true
        })
    }

    /**
     * A one-includes-all pure utility function to preprocess user input string
     * @param {string} originalStr
     * @param {boolean} removePunct true if remove all punctuations in the final
     * output, false otherwise
     * @return {Array.<string>|number} an array of cleaned strings from the original
     * input if it is deemed to be valid, -1 otherwise
     */
    static getValidQueryTokens(originalStr, removePunct = true) {
        let patternTokens = TranscriptSearch.getTokenizedWordsArr(originalStr)

        if (!TranscriptSearch._isValidSearchTokens(patternTokens)) {
            return -1
        }

        // strip out all half-width & full-width punctuations, and strip away
        // dangling punctuations
        if (removePunct){
            patternTokens = patternTokens.map(token => token.replace(PUNCTUATION_REGEX, '')).filter(patternStr=>patternStr.length)
        }

        return patternTokens
    }

    /**
     * Check if a given character is a punctuation or space (both
     * half-width and full-width)
     * @param {string} char one single character to be checked
     * @return {boolean} true if the character is a punctuation or space; false
     * otherwise
     */
    static isNonWordChar(char) {
        return char.match(PUNCTUATION_REGEX) || char === ' ' || char === '　'
    }

    /**
     * Check if a given character is at the start of a word in the given sentence
     * @param {number} pos the position of the character to be checked
     * @param {string} wholeSentence the sentence to be checked
     * @return {boolean} true if pos is the start of a word in the given sentence
     * false otherwise
     */
    static isStartOfWord(pos, wholeSentence) {
        // sanity check for invalid pos and chars
        if (pos < 0 || pos >= wholeSentence.length
            || TranscriptSearch.isNonWordChar(wholeSentence[pos])
        ) {
            return false
        }

        let prevPos = pos - 1
        if (prevPos >= 0) {
            // prevPos being a punctuation or space implies current pos being
            // the beginning of a word
            return TranscriptSearch.isNonWordChar(wholeSentence[prevPos])
        } else return true // if current pos is the start of sentence and not
        // a space/punctuation then it must be the beginning of a word
    }

    /**
     * @param {Array.<string>} rawPatternStr
     * @return {Array.<{matchedSentenceIdx:number, displaySentence:string}>}
     */
    getAutoComplete = (rawPatternStr, maxNumResult = 10, maxDisplayWords = 5) => {
        //====================  Clean inputs ======================
        // sanity check: empty input
        if (!this.sentencesStrs || !this.sentencesStrs.length || !rawPatternStr || !rawPatternStr.length) {
            return []
        }

        let processedTokens = TranscriptSearch.getValidQueryTokens(rawPatternStr)

        if (processedTokens === -1) return []

        let results = []

        // search for all matched positions
        this.sentencesStrs.forEach((sentenceStr, matchedSentenceIdx) => {
            let matchPosInSentence = sentenceStr.toLowerCase().indexOf(processedTokens.join(' ').toLowerCase())
            if (matchPosInSentence!==-1 && TranscriptSearch.isStartOfWord(matchPosInSentence, sentenceStr)) {
                results.push({matchedSentenceIdx,matchPosInSentence})
            }
        })

        // precondition: results = [{matchedSentenceIdx:number,matchPosInSentence:number}]
        // postcondition: results = [{matchedSentenceIdx:number,displaySentence:string}]
        results = results.map(matchInfoTuple => {
            let {matchedSentenceIdx, matchPosInSentence} = matchInfoTuple
            let matchedSentence = this.sentencesStrs[matchedSentenceIdx]

            let matchToTailTokens = TranscriptSearch.getTokenizedWordsArr(matchedSentence.slice(matchPosInSentence))
            matchToTailTokens = matchToTailTokens.slice(0, maxDisplayWords)

            return {
                matchedSentenceIdx,
                displaySentence: matchToTailTokens.join(' ')
            }
        })

        // remove duplicate strings in the autocomplete result
        results = results.filter(
            (matchObj, index, selfArr) => selfArr.findIndex(
                searchRes => searchRes.displaySentence === matchObj.displaySentence
            ) === index
        )

        return results.slice(0,maxNumResult).sort(
            ({displaySentence:str1},{displaySentence:str2})=>(str1.length-str2.length || str1.localeCompare(str2))
        ) // cutoff extra results and sort with increasing str length or alphabetical order
    }

    _getStrArrSortedLengths = (rawSentencesStrs = this.sentencesStrs) => {
        let lengths = rawSentencesStrs.map(str => str.length)
        lengths.sort((a, b) => a - b)
        return lengths
    }

    /**
     * Get a list of raw sentences from the original data array
     * @param {{words: Array.<{t: number, n: string, e: number, d: number}>}} sentencesData
     * @return an array of strings from the this.sentencesData. Should have equal
     * size
     */
    _transformRawSentences = (sentencesData) => {
        let rawTextsArr = null

        if (sentencesData) {
            rawTextsArr = []
            sentencesData.forEach(sentence => {
                let sentenceWordsArr = sentence
                    .words
                    .map(word => word.n)
                rawTextsArr.push(sentenceWordsArr.join(' '))
            })
        } else {
            console.error('invalid sentences data')
        }

        return rawTextsArr
    }

    /**
     * @param {{words: Array.<{t: number, n: string, e: number, d: number}>}} sentencesData
     * @param {Object} initOptions
     * @see http://fusejs.io/#searching-by-id
     */
    constructor(sentencesData) {
        if (!sentencesData || !sentencesData.length) {
            console.warn('TranscriptSearch: empty sentence data')
            return
        }

        this.sentencesData = sentencesData
        this.rawSentencesStrs = this._transformRawSentences(sentencesData)
        // remove all punctuations
        this.sentencesStrs = this.rawSentencesStrs.map(rawSentenceStr => rawSentenceStr.replace(PUNCTUATION_REGEX, ''))

        this.lastSearchPatternTokens = []

        let lengths = this._getStrArrSortedLengths()
        let medianLength = (lengths[(lengths.length - 1) >> 1] + lengths[lengths.length >> 1]) / 2
        let longestLength = lengths[lengths.length - 1]

        this.options = {
            ...defaultOptions,
            location: Math.floor(medianLength / 2), // get middle position
            distance: Math.floor(longestLength / 2) // get radius of longest range
        }
    }

    /**
     * Preprocessing & postprocessing before & after launching the search
     * @param {string} rawPatternStr user input search string
     * @param {boolean} byRelevance flag to indicate the search result rank criteria
     * true if by relevance, false by time
     * @return {Array.<{item:number, matches:Array.<{indices:Array.<Array<number,number>}>}>}
     */
    search = (rawPatternStr, byRelevance) => {

        //====================  Clean inputs ======================

        // sanity check: empty input
        if (!this.sentencesStrs || !this.sentencesStrs.length || !rawPatternStr || !rawPatternStr.length) {
            return []
        }

        let processedTokens = TranscriptSearch.getValidQueryTokens(rawPatternStr)

        if (processedTokens === -1) return []

        //====================  Config Search Params ======================

        let patternTokensStrLengths = this._getStrArrSortedLengths(processedTokens)
        let longestTokenStrLength = patternTokensStrLengths[patternTokensStrLengths.length-1]

        // set the mode flag only when necessary
        if ((byRelevance && !this.options.shouldSort)
            || (!byRelevance && this.options.shouldSort)) {
            this.options.shouldSort = byRelevance
        }

        // if user enters a single word don't change minMatchCharLength
        if (processedTokens.length > 1) {
            this.options.minMatchCharLength = longestTokenStrLength > DEFAULT_MIN_CHAR_LENGTH
                ? longestTokenStrLength
                : DEFAULT_MIN_CHAR_LENGTH
        } else {
            // single token
            this.options.minMatchCharLength = DEFAULT_MIN_CHAR_LENGTH
        }

        this.lastSearchPatternTokens = processedTokens // expose tokens array for external usage

        let rawSearchResults = this._srch(processedTokens.join(' '))

        return rawSearchResults
    }

    /**
     * Core search util
     * @param {string} patternStr a cleaned user input string without punctuations
     * @return {Array.<{item:number,matches:Array}>} item field is the index of
     * the match
     */
    _srch = (patternStr) => {
        this.fuse = new Fuse(this.sentencesStrs, this.options)

        let matchResults = this
            .fuse
            .search(patternStr)

        return matchResults
    }
}