export const removeClass = (className, el) => {
    if (el && el.className && el.className.includes(className)) {
        el.className = Array.from(el.classList).filter(singleClassName=>singleClassName !== className).join(' ')
    }
}

export const addClass = (className, el) => {
    if (el && el.className && !el.className.includes(className)) {
        let workingArr = Array.from(el.classList)
        workingArr.push(className)
        el.className = workingArr.join(' ')
    }
}

export const toggleClass = (className, el) => {
    if (el && el.className) {
        if (el.className.includes(className)) {
            el.className = Array.from(el.classList).filter(singleClassName=>singleClassName !== className).join(' ')
        } else {
            let workingArr = Array.from(el.classList)
            workingArr.push(className)
            el.className = workingArr.join(' ')
        }
    }
}