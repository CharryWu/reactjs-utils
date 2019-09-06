
function dragElement(elmnt, parentElmtWidth, fsElmt, videoWidth,orientation = 'horizontal') {
    let pos1 = 0
    let pos2 = 0
    let pos3 = 0
    let pos4 = 0

    let minimapScrollingFlag = false

    if (!elmnt) return

    if (document.getElementById(`${elmnt.id}header`)) {
        /* if present, the header is where you move the DIV from:*/
        document.getElementById(`${elmnt.id}header`).onmousedown = dragMouseDown
    } else {
        /* otherwise, move the DIV from anywhere inside the DIV:*/
        elmnt.onmousedown = dragMouseDown
    }

    function dragMouseDown(e = window.event) {
        e.preventDefault()
        // get the mouse cursor position at startup:
        pos3 = e.clientX
        pos4 = e.clientY
        document.onmouseup = closeDragElement
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag
    }

    function elementDrag(e = window.event) {
        e.preventDefault()
        minimapScrollingFlag = true
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX
        pos2 = pos4 - e.clientY
        pos3 = e.clientX
        pos4 = e.clientY

        // set the element's new position:
        if (orientation !== 'horizontal') {
            elmnt.style.top = `${elmnt.offsetTop - pos2}px`
        }

        if (orientation === 'horizontal') {
            let targetPos = elmnt.offsetLeft - pos1
            if (targetPos>=0 && targetPos + elmnt.clientWidth <= parentElmtWidth){
                elmnt.style.left = `${targetPos}px`
                fsElmt.scrollLeft = (targetPos / parentElmtWidth) * videoWidth
            }
        }
    }

    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null
        document.onmousemove = null
        minimapScrollingFlag = false // reset flag
    }


    fsElmt.onscroll = (e) => {
        if (!minimapScrollingFlag) {
            // thumb left = thumb scrollWidth * fsEl left / fsEl scrollWidth
            let targetPos = parentElmtWidth * fsElmt.scrollLeft / fsElmt.scrollWidth
            elmnt.style.left = `${targetPos}px`
        }
    }

    return this
}

export default dragElement
