
const expenses = [
    25, 15, 32, 45, 55, 66, 23, 11, 55
]

function createPoint(xCordinates, yCordinates) {
    const point = document.createElement('div')
    point.classList.add('point')
    point.style = `
        z-index:999;
        left: ${xCordinates - 1}%;
        top: ${yCordinates - 1}%;
    `
    return point
}

function loadExpenses() {
    const container = document.getElementById('expenses-container')
    const background = document.createElement('div')
    const offsset = Math.round(100 / expenses.length)
    console.log(offsset)
    let paths = []
    let x = offsset;
    for (let index = 0; index < expenses.length; index++) {
        const element = expenses[index];
        const y = 100 - element
        console.log(element)
        const path = `${x}% ${y}%`
        paths.push(path)
        const point = createPoint(x, y)
        container.appendChild(point)
        x += offsset
    }
    const clipPath = `clip-path: polygon(0% 100%, ${paths.join(',')}, ${x}% 100%);`
    console.log(clipPath)
    background.style = `
        position:absolute;

        background:rgb(121, 144, 234);
        background: linear-gradient(0deg,rgb(255, 255, 255) 0%, rgb(107, 158, 240) 100%);
        ${clipPath}
        `
    container.appendChild(background)
}

loadExpenses()