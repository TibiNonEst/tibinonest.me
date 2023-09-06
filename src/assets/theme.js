const saved = window.localStorage.getItem("theme");
const dark = window.matchMedia("(prefers-color-scheme: dark)");

if (saved === "macchiato") {
    setDark();
} else if (saved === "latte") {
    setLight();
} else {
    testMedia();
}

dark.onchange = () => {
    testMedia();
}

document.getElementById("theme-trigger").onclick = () => {
    if (document.querySelector(":root").getAttribute("data-theme") === "macchiato") {
        setLight();
        window.localStorage.setItem("theme", "latte");

    } else {
        setDark();
        window.localStorage.setItem("theme", "macchiato");
    }
};

function testMedia() {
    if (dark.matches) {
        setDark();
    } else {
        setLight();
    }
}

function setDark() {
    document.querySelector(":root").setAttribute("data-theme", "macchiato");
}

function setLight() {
    document.querySelector(":root").setAttribute("data-theme", "latte");
}

