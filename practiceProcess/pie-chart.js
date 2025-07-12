const radius = 150;

const data = [
    { label: "Water", value: 5, color: "lightgreen", type: "Recursive", sum: 150, currentRotation: 0, previousElement: "Driving license", nextElement: "Electricity" },
    { label: "Electricity", value: 5, color: "yellow", type: "Recursive", sum: 150, currentRotation: 18, previousElement: "Water", nextElement: "Gas" },
    { label: "Gas", value: 5, color: "pink", type: "Recursive", sum: 150, currentRotation: 36, previousElement: "Electricity", nextElement: "Rent" },
    { label: "Rent", value: 5, color: "purple", type: "Recursive", sum: 150, currentRotation: 54, previousElement: "Gas", nextElement: "Bike" },
    { label: "Bike", value: 5, color: "black", type: "Recursive", sum: 150, currentRotation: 72, previousElement: "Rent", nextElement: "Card" },
    { label: "Card", value: 5, color: "gray", type: "Recursive", sum: 150, currentRotation: 90, previousElement: "Bike", nextElement: "Travelling" },
    { label: "Travelling", value: 5, color: "brown", type: "Single", sum: 150, currentRotation: 108, previousElement: "Card", nextElement: "Grocceries" },
    { label: "Grocceries", value: 5, color: "lightblue", type: "Single", sum: 150, currentRotation: 126, previousElement: "Travelling", nextElement: "Gift" },
    { label: "Gift", value: 5, color: "darkgreen", type: "Single", sum: 150, currentRotation: 144, previousElement: "Grocceries", nextElement: "Vacation" },
    { label: "Vacation", value: 5, color: "green", type: "Single", sum: 150, currentRotation: 162, previousElement: "Gift", nextElement: "Study" },
    { label: "Study", value: 15, color: "red", type: "Single", sum: 450, currentRotation: 180, previousElement: "Vacation", nextElement: "Cleaning" },
    { label: "Cleaning", value: 15, color: "darkblue", type: "Recursive", sum: 450, currentRotation: 234, previousElement: "Study", nextElement: "Medical" },
    { label: "Medical", value: 15, color: "orange", type: "Recursive", sum: 450, currentRotation: 288, previousElement: "Cleaning", nextElement: "Driving license" },
    { label: "Driving license", value: 5, color: "blue", type: "Single", sum: 150, currentRotation: 342, previousElement: "Medical", nextElement: "Water" },
];

let previousX = 0
let previousY = 0

function updatePrevAndNextForElementBeforePrevious(previousElement) {
    const elementBeforePreviousElement = slices.get(previousElement.previousElement)
    const nextElement = slices.get(previousElement.nextElement)
    let elementBeforeNextElement = slices.get(nextElement.nextElement)
    elementBeforeNextElement = slices.get(elementBeforeNextElement.nextElement)
    let newData = {
        angle: elementBeforePreviousElement.angle,
        label: elementBeforePreviousElement.label,
        x1: elementBeforePreviousElement.x1,
        y1: elementBeforePreviousElement.y1,
        x2: elementBeforePreviousElement.x2,
        y2: elementBeforePreviousElement.y2,
        largeArc: elementBeforePreviousElement.largeArc,
        angleOffset: elementBeforePreviousElement.initialOffset,
        initialOffset: elementBeforePreviousElement.initialOffset,
        previousElement: elementBeforePreviousElement.previousElement,
        nextElement: previousElement.nextElement,
    }
    slices.set(newData.label, newData)

    newData = {
        angle: elementBeforeNextElement.angle,
        label: elementBeforeNextElement.label,
        x1: elementBeforeNextElement.x1,
        y1: elementBeforeNextElement.y1,
        x2: elementBeforeNextElement.x2,
        y2: elementBeforeNextElement.y2,
        largeArc: elementBeforeNextElement.largeArc,
        angleOffset: elementBeforeNextElement.initialOffset,
        initialOffset: elementBeforeNextElement.initialOffset,
        previousElement: nextElement.nextElement,
        nextElement: elementBeforeNextElement.nextElement,
    }
    slices.set(newData.label, newData)
}

function updatePrevAndNextForElementAfterNext(nextElement) {
    const elementAfterNextElement = slices.get(nextElement.nextElement)
    const prevElement = slices.get(nextElement.previousElement)
    let elementBeforePrevElement = slices.get(prevElement.previousElement)
    elementBeforePrevElement = slices.get(elementBeforePrevElement.previousElement)
    let newData = {
        angle: elementAfterNextElement.angle,
        label: elementAfterNextElement.label,
        x1: elementAfterNextElement.x1,
        y1: elementAfterNextElement.y1,
        x2: elementAfterNextElement.x2,
        y2: elementAfterNextElement.y2,
        largeArc: elementAfterNextElement.largeArc,
        angleOffset: elementAfterNextElement.initialOffset,
        initialOffset: elementAfterNextElement.initialOffset,
        previousElement: nextElement.previousElement,
        nextElement: elementAfterNextElement.nextElement,
    }
    slices.set(newData.label, newData)
    newData = {
        angle: elementBeforePrevElement.angle,
        label: elementBeforePrevElement.label,
        x1: elementBeforePrevElement.x1,
        y1: elementBeforePrevElement.y1,
        x2: elementBeforePrevElement.x2,
        y2: elementBeforePrevElement.y2,
        largeArc: elementBeforePrevElement.largeArc,
        angleOffset: elementBeforePrevElement.initialOffset,
        initialOffset: elementBeforePrevElement.initialOffset,
        previousElement: elementBeforePrevElement.previousElement,
        nextElement: prevElement.previousElement,
    }
    slices.set(newData.label, newData)
}

const slices = new Map()

let isDragging = false;
let dragStartX, dragStartY;
let draggedElement;

function startDrag(evt) {
    if (isDragging == true) {
        if (draggedElement.id == evt.target) {
            draggedElement = evt
        }
    }
    else {
        isDragging = true;
        draggedElement = evt.target;
        dragStartX = evt.offsetX;
        dragStartY = evt.offsetY;
    }
}

function changePositionsWithNext(draggedSlice) {
    // First Get The Elements and Path HTML (SVG) Elements
    const nextElement = slices.get(draggedSlice.nextElement)
    const nextSlice = document.getElementById(draggedSlice.nextElement)
    const draggedSliceElement = document.getElementById(nextElement.previousElement)

    // Calculate New Position for the Next, now previous element
    let x1 = 150 + radius * Math.cos(draggedSlice.initialOffset);
    let y1 = 150 + radius * Math.sin(draggedSlice.initialOffset);
    let x2 = 150 + radius * Math.cos(draggedSlice.initialOffset + nextElement.angle);
    let y2 = 150 + radius * Math.sin(draggedSlice.initialOffset + nextElement.angle);
    const newSliceNext = {
        angle: nextElement.angle,
        label: nextElement.label,
        x1: x1,
        y1: y1,
        x2: x2,
        y2: y2,
        largeArc: nextElement.largeArc,
        angleOffset: draggedSlice.initialOffset,
        initialOffset: draggedSlice.initialOffset,
        previousElement: draggedSlice.previousElement,
        nextElement: nextElement.previousElement,
    }
    // Update the position of the element
    let pathData = [
        `M 150 150`,
        `L ${newSliceNext.x1} ${newSliceNext.y1}`,
        `A ${radius} ${radius} 0 ${newSliceNext.largeArc} 1 ${newSliceNext.x2} ${newSliceNext.y2}`,
        `Z`
    ].join(" ");

    nextSlice.setAttribute('d', pathData)
    nextSlice.style = "opacity: 1;"

    // Calculate the new position of the dragged element
    const draggedSliceNewOffset = (newSliceNext.initialOffset + newSliceNext.angle)

    x1 = 150 + radius * Math.cos(draggedSliceNewOffset);
    y1 = 150 + radius * Math.sin(draggedSliceNewOffset);
    x2 = 150 + radius * Math.cos(draggedSliceNewOffset + draggedSlice.angle);
    y2 = 150 + radius * Math.sin(draggedSliceNewOffset + draggedSlice.angle);

    const newSliceDragged = {
        angle: draggedSlice.angle,
        label: draggedSlice.label,
        x1: x1,
        y1: y1,
        x2: x2,
        y2: y2,
        largeArc: nextElement.largeArc,
        angleOffset: draggedSliceNewOffset,
        initialOffset: draggedSliceNewOffset,
        previousElement: draggedSlice.nextElement,
        nextElement: nextElement.nextElement,
    }
    // Update the position of the element
    pathData = [
        `M 150 150`,
        `L ${newSliceDragged.x1} ${newSliceDragged.y1}`,
        `A ${radius} ${radius} 0 ${newSliceDragged.largeArc} 1 ${newSliceDragged.x2} ${newSliceDragged.y2}`,
        `Z`
    ].join(" ");

    draggedSliceElement.setAttribute('d', pathData)
    draggedSliceElement.style = "opacity: 1;"
    slices.delete(newSliceDragged.label)
    slices.delete(newSliceNext.label)
    slices.set(newSliceDragged.label, newSliceDragged)
    slices.set(newSliceNext.label, newSliceNext)
    updatePrevAndNextForElementAfterNext(nextElement)
    return newSliceDragged
}

function changePositionsWithPrevious(draggedSlice) {
    // First Get The Elements and Path HTML (SVG) Elements
    const prevElement = slices.get(draggedSlice.previousElement)
    const prevElementSlice = document.getElementById(draggedSlice.previousElement)
    const draggedSliceElement = document.getElementById(prevElement.nextElement)
    let offsetForPrevElement = 0
    if (draggedSlice.angle == prevElement.angle) offsetForPrevElement = draggedSlice.initialOffset
    else if (prevElement.angle > draggedElement.angle) offsetForPrevElement = draggedSlice.initialOffset - prevElement.angle
    else offsetForPrevElement = (draggedSlice.initialOffset + draggedSlice.angle) - prevElement.angle
    // Calculate New Position for the Previous, now Next element
    let x1 = 150 + radius * Math.cos(offsetForPrevElement);
    let y1 = 150 + radius * Math.sin(offsetForPrevElement);
    let x2 = 150 + radius * Math.cos(offsetForPrevElement + prevElement.angle);
    let y2 = 150 + radius * Math.sin(offsetForPrevElement + prevElement.angle);
    const newSlicePrevious = {
        angle: prevElement.angle,
        label: prevElement.label,
        x1: x1,
        y1: y1,
        x2: x2,
        y2: y2,
        largeArc: prevElement.largeArc,
        angleOffset: offsetForPrevElement,
        initialOffset: offsetForPrevElement,
        previousElement: draggedSlice.label,
        nextElement: draggedSlice.nextElement,
    }

    // Update the position of the element
    let pathData = [
        `M 150 150`,
        `L ${newSlicePrevious.x1} ${newSlicePrevious.y1}`,
        `A ${radius} ${radius} 0 ${newSlicePrevious.largeArc} 1 ${newSlicePrevious.x2} ${newSlicePrevious.y2}`,
        `Z`
    ].join(" ");
    prevElementSlice.setAttribute('d', pathData)
    prevElementSlice.style = "opacity: 1;"

    // Calculate New Position for the dragged element
    x1 = 150 + radius * Math.cos(prevElement.initialOffset);
    y1 = 150 + radius * Math.sin(prevElement.initialOffset);
    x2 = 150 + radius * Math.cos(prevElement.initialOffset + draggedSlice.angle);
    y2 = 150 + radius * Math.sin(prevElement.initialOffset + draggedSlice.angle);
    const newSliceDragged = {
        angle: draggedSlice.angle,
        label: draggedSlice.label,
        x1: x1,
        y1: y1,
        x2: x2,
        y2: y2,
        largeArc: draggedSlice.largeArc,
        angleOffset: prevElement.initialOffset,
        initialOffset: prevElement.initialOffset,
        previousElement: prevElement.previousElement,
        nextElement: newSlicePrevious.label,
    }
    // Update the position of the element
    pathData = [
        `M 150 150`,
        `L ${newSliceDragged.x1} ${newSliceDragged.y1}`,
        `A ${radius} ${radius} 0 ${newSliceDragged.largeArc} 1 ${newSliceDragged.x2} ${newSliceDragged.y2}`,
        `Z`
    ].join(" ");

    draggedSliceElement.setAttribute('d', pathData)
    draggedSliceElement.style = "opacity: 1;"

    slices.delete(newSliceDragged.label)
    slices.delete(newSlicePrevious.label)
    slices.set(newSliceDragged.label, newSliceDragged)
    slices.set(newSlicePrevious.label, newSlicePrevious)
    updatePrevAndNextForElementBeforePrevious(prevElement)
    return newSliceDragged
}

function changeVisual(draggedSlice) {
    const nextSlice = document.getElementById(draggedSlice.nextElement)
    const prevSlice = document.getElementById(draggedSlice.previousElement)
    const initOffset = draggedSlice.initialOffset
    const offsetNow = draggedSlice.angleOffset
    if (offsetNow - initOffset > 0 && offsetNow - initOffset > 0.7 * draggedSlice.angle) draggedSlice = changePositionsWithNext(draggedSlice)
    else if (offsetNow - initOffset > 0 && offsetNow - initOffset > 0.5 * draggedSlice.angle) nextSlice.style = "opacity: 0.3;"
    else nextSlice.style = "opacity: 1;"
    if (offsetNow - initOffset < 0 && offsetNow - initOffset < -0.7 * draggedSlice.angle) draggedSlice = changePositionsWithPrevious(draggedSlice)
    else if (offsetNow - initOffset < 0 && offsetNow - initOffset < -0.5 * draggedSlice.angle) prevSlice.style = "opacity: 0.3;"
    else prevSlice.style = "opacity: 1;"
    return draggedSlice
}

function getDistanceBetweenCurrentAndNext(draggedSlice) {

    draggedSlice = changeVisual(draggedSlice)
    draggedSlice.angleOffset += draggedSlice.angle / 100
    const x1 = 150 + radius * Math.cos(draggedSlice.angleOffset);
    const y1 = 150 + radius * Math.sin(draggedSlice.angleOffset);
    const x2 = 150 + radius * Math.cos(draggedSlice.angleOffset + draggedSlice.angle);
    const y2 = 150 + radius * Math.sin(draggedSlice.angleOffset + draggedSlice.angle);

    const newSlice = {
        label: draggedSlice.label,
        angle: draggedSlice.angle,
        x1: x1,
        y1: y1,
        x2: x2,
        y2: y2,
        initialOffset: draggedSlice.initialOffset,
        largeArc: draggedSlice.largeArc,
        angleOffset: draggedSlice.angleOffset,
        previousElement: draggedSlice.previousElement,
        nextElement: draggedSlice.nextElement,
    }
    return newSlice
}

function getDistanceBetweenCurrentAndPrevious(draggedSlice) {
    changeVisual(draggedSlice)
    draggedSlice.angleOffset -= draggedSlice.angle / 100
    const x1 = 150 + radius * Math.cos(draggedSlice.angleOffset);
    const y1 = 150 + radius * Math.sin(draggedSlice.angleOffset);
    const x2 = 150 + radius * Math.cos(draggedSlice.angleOffset + draggedSlice.angle);
    const y2 = 150 + radius * Math.sin(draggedSlice.angleOffset + draggedSlice.angle);

    const newSlice = {
        label: draggedSlice.label,
        angle: draggedSlice.angle,
        x1: x1,
        y1: y1,
        x2: x2,
        y2: y2,
        initialOffset: draggedSlice.initialOffset,
        largeArc: draggedSlice.largeArc,
        angleOffset: draggedSlice.angleOffset,
        previousElement: draggedSlice.previousElement,
        nextElement: draggedSlice.nextElement,
    }
    return newSlice
}

function handleUpperRightSection(evt, draggedSlice, nextElement, previousElement) {
    if (evt.offsetX > previousX && evt.offsetY > previousY) {
        draggedSlice = getDistanceBetweenCurrentAndNext(draggedSlice, nextElement)
    }
    else if (evt.offsetX > previousX && evt.offsetY == previousY) {
        draggedSlice = getDistanceBetweenCurrentAndNext(draggedSlice, nextElement)
    }
    else if (evt.offsetX == previousX && evt.offsetY > previousY) {
        draggedSlice = getDistanceBetweenCurrentAndNext(draggedSlice, nextElement)
    }
    else if (evt.offsetX < previousX && evt.offsetY > previousY) { } // Do nothing
    else if (evt.offsetX > previousX && evt.offsetY < previousY) { } // Do nothing
    else {
        draggedSlice = getDistanceBetweenCurrentAndPrevious(draggedSlice, previousElement)
    }
    previousX = evt.offsetX
    previousY = evt.offsetY
    return draggedSlice
}

function handleUpperLeftSection(evt, draggedSlice, nextElement, previousElement) {
    if (evt.offsetX > previousX && evt.offsetY < previousY) {
        draggedSlice = getDistanceBetweenCurrentAndNext(draggedSlice, nextElement)
    }
    else if (evt.offsetX == previousX && evt.offsetY < previousY) {
        draggedSlice = getDistanceBetweenCurrentAndNext(draggedSlice, nextElement)
    }
    else if (evt.offsetX > previousX && evt.offsetY == previousY) {
        draggedSlice = getDistanceBetweenCurrentAndNext(draggedSlice, nextElement)
    }
    else if (evt.offsetX < previousX && evt.offsetY < previousY) { } // Do nothing
    else if (evt.offsetX > previousX && evt.offsetY > previousY) { } // DO nothing
    else {
        draggedSlice = getDistanceBetweenCurrentAndPrevious(draggedSlice, previousElement)
    }
    previousX = evt.offsetX
    previousY = evt.offsetY
    return draggedSlice
}

function handleLowerRightSection(evt, draggedSlice, nextElement, previousElement) {
    if (evt.offsetX < previousX && evt.offsetY > previousY) {
        draggedSlice = getDistanceBetweenCurrentAndNext(draggedSlice, nextElement)
    }
    else if (evt.offsetX < previousX && evt.offsetY == previousY) {
        draggedSlice = getDistanceBetweenCurrentAndNext(draggedSlice, nextElement)
    }
    else if (evt.offsetX == previousX && evt.offsetY > previousY) {
        draggedSlice = getDistanceBetweenCurrentAndNext(draggedSlice, nextElement)
    }
    else if (evt.offsetX < previousX && evt.offsetY < previousY) { } // Do nothing
    else if (evt.offsetX > previousX && evt.offsetY > previousY) { } // Do nothing
    else {
        draggedSlice = getDistanceBetweenCurrentAndPrevious(draggedSlice, previousElement)
    }
    previousX = evt.offsetX
    previousY = evt.offsetY
    return draggedSlice
}

function handleLowerLeftSection(evt, draggedSlice, nextElement, previousElement) {
    if (evt.offsetX < previousX && evt.offsetY < previousY) {
        draggedSlice = getDistanceBetweenCurrentAndNext(draggedSlice, nextElement)
    }
    else if (evt.offsetX == previousX && evt.offsetY < previousY) {
        draggedSlice = getDistanceBetweenCurrentAndNext(draggedSlice, nextElement)
    }
    else if (evt.offsetX < previousX && evt.offsetY == previousY) {
        draggedSlice = getDistanceBetweenCurrentAndNext(draggedSlice, nextElement)
    }
    else if (evt.offsetX < previousX && evt.offsetY > previousY) { } // Do nothing
    else if (evt.offsetX > previousX && evt.offsetY < previousY) { } // DO nothing
    else {
        draggedSlice = getDistanceBetweenCurrentAndPrevious(draggedSlice, previousElement)
    }
    previousX = evt.offsetX
    previousY = evt.offsetY
    return draggedSlice
}

function drag(evt) {
    if (evt.target.id != "pie-chart") {
        let draggedSlice = slices.get(evt.target.id)
        const previousElement = slices.get(draggedSlice.previousElement)
        const nextElement = slices.get(draggedSlice.nextElement)
        const element = document.getElementById(evt.target.id)
        if (!isDragging) return;
        console.log(evt.offsetX, evt.offsetY)
        if (evt.offsetX > 150 && evt.offsetY < 150) {
            draggedSlice = handleUpperRightSection(evt, draggedSlice, nextElement, previousElement)
        }
        else if (evt.offsetX < 150 && evt.offsetY < 150) {
            draggedSlice = handleUpperLeftSection(evt, draggedSlice, nextElement, previousElement)
        }
        else if (evt.offsetX > 150 && evt.offsetY > 150) {
            draggedSlice = handleLowerRightSection(evt, draggedSlice, nextElement, previousElement)
        }
        else if (evt.offsetX < 150 && evt.offsetY > 150) {
            draggedSlice = handleLowerLeftSection(evt, draggedSlice, nextElement, previousElement)
        }

        slices.delete(evt.target.id)
        slices.set(evt.target.id, draggedSlice)
        const pathData = [
            `M 150 150`,
            `L ${draggedSlice.x1} ${draggedSlice.y1}`,
            `A ${radius} ${radius} 0 ${draggedSlice.largeArc} 1 ${draggedSlice.x2} ${draggedSlice.y2}`,
            `Z`
        ].join(" ");
        element.setAttribute('d', pathData)
    }
}

function endDrag(evt) {
    isDragging = false;
    if (evt.target.id !== "pie-chart") {
        let draggedElement = slices.get(evt.target.id)
        const draggedSlice = document.getElementById(evt.target.id)
        const initOffset = draggedElement.initialOffset
        const offsetNow = draggedElement.angleOffset
        if (offsetNow - initOffset > 0 && offsetNow - initOffset > 0.5 * draggedElement.angle) draggedElement = changePositionsWithNext(draggedElement)
        else if (offsetNow - initOffset < 0 && offsetNow - initOffset < -0.5 * draggedElement.angle) draggedElement = changePositionsWithPrevious(draggedElement)
        else {
            const x1 = 150 + radius * Math.cos(draggedElement.initialOffset);
            const y1 = 150 + radius * Math.sin(draggedElement.initialOffset);
            const x2 = 150 + radius * Math.cos(draggedElement.initialOffset + draggedElement.angle);
            const y2 = 150 + radius * Math.sin(draggedElement.initialOffset + draggedElement.angle);
            draggedElement = {
                label: draggedSlice.label,
                angle: draggedSlice.angle,
                x1: x1,
                y1: y1,
                x2: x2,
                y2: y2,
                initialOffset: draggedElement.initialOffset,
                largeArc: draggedElement.largeArc,
                angleOffset: draggedElement.initialOffset,
                previousElement: draggedElement.previousElement,
                nextElement: draggedElement.nextElement,
            }
        }
        draggedSlice.style = "opacity: 1;"
        const pathData = [
            `M 150 150`,
            `L ${draggedElement.x1} ${draggedElement.y1}`,
            `A ${radius} ${radius} 0 ${draggedElement.largeArc} 1 ${draggedElement.x2} ${draggedElement.y2}`,
            `Z`
        ].join(" ");
        draggedSlice.setAttribute('d', pathData)
    }
}

const svg = document.getElementById("pie-chart");
const tooltip = document.getElementById("tooltip");
let total = data.reduce((sum, item) => sum + item.value, 0);
let angleOffset = 0;

data.forEach((slice) => {

    const angle = (slice.value / total) * 2 * Math.PI;
    const x1 = 150 + radius * Math.cos(angleOffset);
    const y1 = 150 + radius * Math.sin(angleOffset);
    const x2 = 150 + radius * Math.cos(angleOffset + angle);
    const y2 = 150 + radius * Math.sin(angleOffset + angle);
    const largeArc = angle > Math.PI ? 1 : 0;
    const newSlice = {
        label: slice.label,
        angle: angle,
        x1: x1,
        y1: y1,
        x2: x2,
        y2: y2,
        initialOffset: angleOffset,
        largeArc: largeArc,
        angleOffset: angleOffset,
        previousElement: slice.previousElement,
        nextElement: slice.nextElement,
    }

    slices.set(slice.label, newSlice)
    const pathData = [
        `M 150 150`,
        `L ${x1} ${y1}`,
        `A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`,
        `Z`
    ].join(" ");

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", pathData);
    path.setAttribute("id", slice.label);
    path.setAttribute("fill", slice.color);
    path.setAttribute("stroke", "white");

    path.addEventListener("mouseenter", (e) => {
        path.setAttribute("style", "opacity:0.5; cursor: pointer;");
        tooltip.style.left = e.offsetX + "px";
        tooltip.style.top = e.offsetY + "px";
        tooltip.textContent = `${slice.label}: ${slice.value}`;
        tooltip.classList.remove("hidden");
    });

    path.addEventListener('mousedown', startDrag);
    document.getElementById('pie-chart-inner').addEventListener('mousemove', drag);
    document.getElementById('pie-chart-inner').addEventListener('mouseup', endDrag);

    path.addEventListener("mouseleave", (evt) => {
        path.setAttribute("style", "opacity:1;");
        tooltip.classList.add("hidden");
    });
    svg.appendChild(path);
    angleOffset += angle;
});