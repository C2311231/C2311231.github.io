
// I am not very good at js and the course didn't teach js so I am just leaving this how it is

const releaseBtn = document.getElementById("releaseBtn")
const timeBtn = document.getElementById("timeBtn")
const GUIBtn = document.getElementById("GUIBtn")
const modBtn = document.getElementById("modBtn")

const releaseCloseBtn = document.getElementById("releaseCloseBtn")
const timeCloseBtn = document.getElementById("timeCloseBtn")
const GUICloseBtn = document.getElementById("GUICloseBtn")
const modCloseBtn = document.getElementById("modCloseBtn")

const releaseOpenBtn = document.getElementById("releaseOpenBtn")
const timeOpenBtn = document.getElementById("timeOpenBtn")
const GUIOpenBtn = document.getElementById("GUIOpenBtn")
const modOpenBtn = document.getElementById("modOpenBtn")

const releaseSection = document.getElementById("releaseSection")
const timeSection = document.getElementById("timeSection")
const GUISection = document.getElementById("GUISection")
const modSection = document.getElementById("modSection")

releaseBtn.addEventListener('change', function () {
    if (releaseBtn.checked) {
        releaseOpenBtn.style.display = "none"
        releaseCloseBtn.style.display = "block"
        releaseSection.style.display = "block"
    }
    else {
        releaseOpenBtn.style.display = "block"
        releaseCloseBtn.style.display = "none"
        releaseSection.style.display = "none"
    }
})

timeBtn.addEventListener('change', function () {
    if (timeBtn.checked) {
        timeOpenBtn.style.display = "none"
        timeCloseBtn.style.display = "block"
        timeSection.style.display = "block"
    }
    else {
        timeOpenBtn.style.display = "block"
        timeCloseBtn.style.display = "none"
        timeSection.style.display = "none"
    }
})

GUIBtn.addEventListener('change', function () {
    if (GUIBtn.checked) {
        GUIOpenBtn.style.display = "none"
        GUICloseBtn.style.display = "block"
        GUISection.style.display = "block"
    }
    else {
        GUIOpenBtn.style.display = "block"
        GUICloseBtn.style.display = "none"
        GUISection.style.display = "none"
    }
})

modBtn.addEventListener('change', function () {
    if (modBtn.checked) {
        modOpenBtn.style.display = "none"
        modCloseBtn.style.display = "block"
        modSection.style.display = "block"
    }
    else {
        modOpenBtn.style.display = "block"
        modCloseBtn.style.display = "none"
        modSection.style.display = "none"
    }
})