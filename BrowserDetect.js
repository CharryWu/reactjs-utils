import bowser from 'bowser'
export const browser = bowser.getParser(window.navigator.userAgent)
export const browserInfo = browser.getBrowser()
export const userTech = browser.parse().parsedResult